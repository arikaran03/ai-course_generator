import { GoogleGenerativeAI } from '@google/generative-ai';
import Lesson from '../models/lessonModel.js';
import Module from '../models/moduleModel.js';
import Course from '../models/courseModel.js';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (lesson) {
      return res.json(lesson);
    } else {
      return res.status(404).json({ message: 'Lesson not found' });
    }
  } catch (error) {
    console.error('Error fetching lesson:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const generateLessonContent = async (req, res) => {
    try{

        const lessonId  = req.params.id; // Get lesson ID from URL
        // res.status(400).json({ message: lessonId});
        const lesson = await Lesson.findById(lessonId);
        // const course = await Course.findById(lessonId);
        console.log('Lesson ID:', lessonId);
        if (!lesson) {
        return res.status(404).json({ message: 'Lesson not founddd' ,  id : `${lessonId}` });
        }

        const module = await Module.findById(lesson.module);
        if (!module) {
          return res.status(404).json({ message: 'Parent module not found for this lesson' });
        }

        const course = await Course.findById(module.course);
        if (!course) {
          return res.status(404).json({ message: 'Parent course not found for this module' });
        }

        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        // ai prompt 
        const prompt = `
        You are an expert instructional designer. Your task is to generate the content for a single lesson within an online course.
        
        Course Title: "${course.title}"
        Module Title: "${module.title}"
        Lesson Title: "${lesson.title}"

        Generate the lesson content with the following structure:
        1. Start with a "heading" block for the lesson title.
        2. Follow with one or two "paragraph" blocks explaining the core concepts.
        3. If relevant to the topic, include one "code" block with a simple example. Use python as the default language if not specified.
        4. Include one "video" block with a concise, relevant search query for YouTube (e.g., "What are React Hooks?").
        5. End with two "mcq" (multiple-choice question) blocks to test understanding. Each MCQ should have a question, an array of 3-4 options, and the zero-based index of the correct answer.

        You MUST respond with ONLY a raw JSON object representing an array of these content blocks. Do not include any markdown, comments, or other text.
        The JSON structure must be an array of objects, like this:
        [
            { "type": "heading", "text": "Lesson Title Here" },
            { "type": "paragraph", "text": "This is the first paragraph of the lesson..." },
            { "type": "code", "language": "javascript", "text": "console.log('Hello, World!');" },
            { "type": "video", "query": "A relevant YouTube search query" },
            { "type": "mcq", "question": "What is 1 + 1?", "options": ["1", "2", "3"], "answer": 1 }
        ]
        `;

        // api call 
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        // Parse and Save to Database
        const cleanedJsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const generatedContent = JSON.parse(cleanedJsonString);

        lesson.content = generatedContent;
        const updatedLesson = await lesson.save();

        res.status(200).json({
            message: 'Lesson content generated successfully',
            lesson: updatedLesson,
        });
    }

    catch(error){
        console.error('Error generating lesson content:', error);
        if (error.message.includes('SAFETY')) {
         return res.status(400).json({ message: 'The topic triggered the AI\'s safety filters. Please try a different topic.' });
        }
        console.log('Error details:', error);
        res.status(500).json({ message: 'An error occurred on the server while generating lesson content.' });
    }

};

export { generateLessonContent, getLessonById };