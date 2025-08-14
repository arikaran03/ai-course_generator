import express from 'express';
import generateCourse  from '../controllers/courseController.js'; 

const router = express.Router(); 

router.post('/generate', generateCourse);

router.get('/',(req,res) => {
    res.send("Welcome to the course generation API!"); 
})

export default router;