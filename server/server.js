import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js'; 
import courseRoutes from './routes/courseRoutes.js'; 
import lessonRoutes from './routes/lessonRoutes.js';
import youtubeRoutes from './routes/youtubeRoutes.js'; 
// import { youtube } from 'googleapis/build/src/apis/youtube/index.js';


dotenv.config();
connectDB(); 
const app = express(); 
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/',(req,res) => {
    res.send("Welcome to the server!"); 
}); 

app.use('/api/courses', courseRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/youtube', youtubeRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 