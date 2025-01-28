import express from 'express';
import { courseController } from '../controllers/course.controller';
import { authenticate, authorizeRoles } from '../middleware/auth.middleware';

const router = express.Router();

// Public Routes
router.get('/', courseController.getAllCourses);
router.get('/:courseId', courseController.getCourseById);
router.get('/:courseId/reviews', courseController.getCourseReviews);

// Protected Routes
router.post('/', 
  authenticate, 
  authorizeRoles('ADMIN', 'INSTRUCTOR'), 
  courseController.createCourse
);

router.post('/enroll', 
  authenticate, 
  courseController.enrollInCourse
);

router.post('/:courseId/reviews', 
  authenticate, 
  courseController.addCourseReview
);

export default router;
