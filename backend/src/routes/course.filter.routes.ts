import express from 'express';
import { courseFilterController } from '../controllers/course.filter.controller';

const router = express.Router();

// Public Filter Routes
router.get('/courses', courseFilterController.filterCourses);
router.get('/filter-options', courseFilterController.getFilterOptions);

export default router;
