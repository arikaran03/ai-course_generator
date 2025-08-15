import express from 'express';
import { generateLessonContent } from '../controllers/lessonController.js';

const router = express.Router();

// This will respond to POST requests at /api/lessons/:id/generate-content
// where :id is the ID of the lesson we want to generate content for.
router.post('/:id/generate-content', generateLessonContent);

export default router;