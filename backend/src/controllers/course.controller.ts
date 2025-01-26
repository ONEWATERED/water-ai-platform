import { Request, Response } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

// Validation Schemas
const courseCreateSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  difficulty: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']),
  price: z.number().positive('Price must be positive'),
  thumbnail: z.string().optional(),
  categories: z.array(z.string()).optional(),
  curriculum: z.array(z.object({
    week: z.number(),
    title: z.string(),
    topics: z.array(z.string())
  })).optional()
});

const enrollmentSchema = z.object({
  courseId: z.string(),
  enrollmentType: z.enum(['FULL', 'INSTALLMENT'])
});

const reviewSchema = z.object({
  courseId: z.string(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(10, 'Review must be at least 10 characters')
});

export const courseController = {
  async getAllCourses(req: Request, res: Response) {
    try {
      const { 
        search, 
        category, 
        difficulty, 
        minPrice, 
        maxPrice, 
        page = 1, 
        limit = 10 
      } = req.query;

      const whereCondition: Prisma.CourseWhereInput = {
        ...(search && {
          OR: [
            { title: { contains: search as string, mode: 'insensitive' } },
            { description: { contains: search as string, mode: 'insensitive' } }
          ]
        }),
        ...(category && { categories: { some: { name: category as string } } }),
        ...(minPrice && { price: { gte: Number(minPrice) } }),
        ...(maxPrice && { price: { lte: Number(maxPrice) } })
      };

      const courses = await prisma.course.findMany({
        where: whereCondition,
        select: {
          id: true,
          title: true,
          description: true,
          price: true,
          categories: true,
          _count: {
            select: { 
              enrollments: true
            }
          }
        },
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit)
      });

      const totalCourses = await prisma.course.count({ where: whereCondition });

      res.json({
        courses: courses.map(course => ({
          ...course,
          enrollmentCount: course._count.enrollments,
          categories: course.categories.map(cat => cat.name)
        })),
        pagination: {
          currentPage: Number(page),
          totalPages: Math.ceil(totalCourses / Number(limit)),
          totalCourses
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch courses' });
    }
  },

  async getCourseById(req: Request, res: Response) {
    try {
      const { courseId } = req.params;
      const course = await prisma.course.findUnique({
        where: { id: courseId },
        include: {
          _count: {
            select: { 
              enrollments: true
            }
          }
        }
      });

      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }

      res.json({
        ...course,
        enrollmentCount: course._count.enrollments
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch course details' });
    }
  },

  async createCourse(req: Request, res: Response) {
    try {
      const validatedData = courseCreateSchema.parse(req.body);

      const course = await prisma.course.create({
        data: {
          ...validatedData,
          authorId: req.user.id,
          categories: validatedData.categories 
            ? { connect: validatedData.categories.map(cat => ({ name: cat })) }
            : undefined
        }
      });

      res.status(201).json(course);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      res.status(500).json({ error: 'Failed to create course' });
    }
  },

  async enrollInCourse(req: Request, res: Response) {
    try {
      const userId = req.user.id; // Assuming authenticated middleware sets user
      const { courseId, enrollmentType } = enrollmentSchema.parse(req.body);

      // Check if already enrolled
      const existingEnrollment = await prisma.courseEnrollment.findUnique({
        where: {
          userId_courseId: { userId, courseId }
        }
      });

      if (existingEnrollment) {
        return res.status(400).json({ error: 'Already enrolled in this course' });
      }

      const enrollment = await prisma.courseEnrollment.create({
        data: {
          userId,
          courseId,
          enrollmentType
        }
      });

      res.status(201).json(enrollment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      res.status(500).json({ error: 'Enrollment failed' });
    }
  },

  async addCourseReview(req: Request, res: Response) {
    try {
      const userId = req.user.id; // Assuming authenticated middleware sets user
      const { courseId, rating, comment } = reviewSchema.parse(req.body);

      // Check if user is enrolled in the course
      const enrollment = await prisma.courseEnrollment.findUnique({
        where: {
          userId_courseId: { userId, courseId }
        }
      });

      if (!enrollment) {
        return res.status(403).json({ error: 'Must be enrolled to review' });
      }

      // Check if review already exists
      const existingReview = await prisma.courseReview.findUnique({
        where: {
          userId_courseId: { userId, courseId }
        }
      });

      if (existingReview) {
        return res.status(400).json({ error: 'Review already submitted' });
      }

      const review = await prisma.courseReview.create({
        data: {
          userId,
          courseId,
          rating,
          comment
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true
            }
          }
        }
      });

      res.status(201).json(review);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      res.status(500).json({ error: 'Review submission failed' });
    }
  },

  async getCourseReviews(req: Request, res: Response) {
    try {
      const { courseId } = req.params;

      const reviews = await prisma.courseReview.findMany({
        where: { courseId },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch reviews' });
    }
  }
};
