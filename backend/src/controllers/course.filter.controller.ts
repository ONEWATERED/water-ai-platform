import { Request, Response } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

// Advanced Filtering Schema
const courseFilterSchema = z.object({
  search: z.string().optional(),
  categories: z.array(z.string()).optional(),
  difficulties: z.array(z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED'])).optional(),
  priceRange: z.object({
    min: z.number().optional(),
    max: z.number().optional()
  }).optional(),
  sortBy: z.enum(['PRICE_ASC', 'PRICE_DESC', 'RATING', 'POPULARITY']).optional(),
  page: z.number().int().positive().optional().default(1),
  pageSize: z.number().int().positive().optional().default(10)
});

export const courseFilterController = {
  async filterCourses(req: Request, res: Response) {
    try {
      const validatedFilter = courseFilterSchema.parse({
        ...req.query,
        page: parseInt(req.query.page as string || '1'),
        pageSize: parseInt(req.query.pageSize as string || '10')
      });

      const { 
        search, 
        categories, 
        difficulties, 
        priceRange, 
        sortBy, 
        page, 
        pageSize 
      } = validatedFilter;

      // Dynamic filter construction
      const filter: Prisma.CourseWhereInput = {
        ...(search && {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
            { instructor: { contains: search, mode: 'insensitive' } }
          ]
        }),
        ...(categories && { categories: { hasSome: categories } }),
        ...(difficulties && { difficulty: { in: difficulties } }),
        ...(priceRange && {
          price: {
            ...(priceRange.min !== undefined && { gte: priceRange.min }),
            ...(priceRange.max !== undefined && { lte: priceRange.max })
          }
        })
      };

      // Dynamic sorting
      const orderBy: Prisma.CourseOrderByWithRelationInput = 
        sortBy === 'PRICE_ASC' ? { price: 'asc' } :
        sortBy === 'PRICE_DESC' ? { price: 'desc' } :
        sortBy === 'RATING' ? { 
          reviews: { 
            _count: 'desc' 
          } 
        } :
        sortBy === 'POPULARITY' ? { 
          enrollments: { 
            _count: 'desc' 
          } 
        } :
        { createdAt: 'desc' };

      // Pagination
      const skip = (page - 1) * pageSize;

      // Fetch courses with advanced filtering
      const [courses, totalCourses] = await Promise.all([
        prisma.course.findMany({
          where: filter,
          orderBy,
          skip,
          take: pageSize,
          include: {
            _count: {
              select: { 
                enrollments: true,
                reviews: true 
              }
            }
          }
        }),
        prisma.course.count({ where: filter })
      ]);

      // Transform courses with additional metadata
      const transformedCourses = courses.map(course => ({
        ...course,
        enrollmentCount: course._count.enrollments,
        reviewCount: course._count.reviews
      }));

      res.json({
        courses: transformedCourses,
        pagination: {
          currentPage: page,
          pageSize,
          totalCourses,
          totalPages: Math.ceil(totalCourses / pageSize)
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      res.status(500).json({ error: 'Course filtering failed' });
    }
  },

  async getFilterOptions(req: Request, res: Response) {
    try {
      const [categories, difficulties, priceStats] = await Promise.all([
        prisma.course.findMany({
          select: { categories: true },
          distinct: ['categories']
        }),
        prisma.course.findMany({
          select: { difficulty: true },
          distinct: ['difficulty']
        }),
        prisma.course.aggregate({
          _min: { price: true },
          _max: { price: true }
        })
      ]);

      // Flatten and deduplicate categories
      const uniqueCategories = [
        ...new Set(
          categories.flatMap(course => course.categories || [])
        )
      ];

      res.json({
        categories: uniqueCategories,
        difficulties: difficulties.map(d => d.difficulty),
        priceRange: {
          min: priceStats._min.price || 0,
          max: priceStats._max.price || 1000
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve filter options' });
    }
  }
};
