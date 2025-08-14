import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js'; 
import courseRoutes from './routes/courseRoutes.js'; 

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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 