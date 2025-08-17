import express from 'express';
import { generateLessonContent, getLessonById} from '../controllers/lessonController.js';

const router = express.Router();

router.get('/:id', getLessonById);
router.get('/:id/generate-content', generateLessonContent);

export default router;