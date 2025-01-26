import express from 'express';
import { courseController } from '../controllers/course.controller';
import { authenticateUser, authorizeRoles } from '../middleware/auth.middleware';

const router = express.Router();

// Public Routes
router.get('/', courseController.getAllCourses);
router.get('/:courseId', courseController.getCourseById);
router.get('/:courseId/reviews', courseController.getCourseReviews);

// Protected Routes
router.post('/', 
  authenticateUser, 
  authorizeRoles(['ADMIN', 'INSTRUCTOR']), 
  courseController.createCourse
);

router.post('/enroll', 
  authenticateUser, 
  courseController.enrollInCourse
);

router.post('/:courseId/reviews', 
  authenticateUser, 
  courseController.addCourseReview
);

export default router;
