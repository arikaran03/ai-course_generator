import express from 'express';
import { generateCourse, getCourseById, getAllCourses} from '../controllers/courseController.js'; 

const router = express.Router(); 

router.get('/', getAllCourses);

router.post('/generate', generateCourse);

router.get('/:id', getCourseById);

export default router;