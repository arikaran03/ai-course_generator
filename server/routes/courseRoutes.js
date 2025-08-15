import express from 'express';
import { generateCourse, getCourseById } from '../controllers/courseController.js'; 

const router = express.Router(); 

router.post('/generate', generateCourse);

router.get('/:id', getCourseById);

export default router;