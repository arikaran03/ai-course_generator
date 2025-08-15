// @route   POST /api/courses/generate
import { GoogleGenerativeAI } from '@google/generative-ai';
import Course from '../models/courseModel.js';
import Module from '../models/moduleModel.js';
import Lesson from '../models/lessonModel.js';
import  dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateCourse = async (req, res) => {
  // ... (existing generateCourse function code remains the same)
  const { topic } = req.body;

  if (!topic) {
    return res.status(400).json({ message: 'Please provide a topic' });
  }

  try {
    // 1. --- AI Prompt Engineering ---
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `
      Create a comprehensive course outline about "${topic}".
      The course should have a clear title and a brief, engaging description.
      It must be structured into 4 to 6 modules.
      Each module must contain 3 to 5 lesson titles.

      You MUST respond with ONLY a raw JSON object, without any markdown formatting, comments, or other text.
      The JSON object must follow this exact structure:
      {
        "title": "Course Title",
        "description": "Course Description",
        "modules": [
          {
            "title": "Module 1 Title",
            "lessons": ["Lesson 1.1 Title", "Lesson 1.2 Title"]
          },
          {
            "title": "Module 2 Title",
            "lessons": ["Lesson 2.1 Title", "Lesson 2.2 Title"]
          }
        ]
      }
    `;

    // 2. --- Call the AI ---
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // 3. --- Parse the AI Response ---
    const cleanedJsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const courseData = JSON.parse(cleanedJsonString);

    // 4. --- Save to Database ---
    const newCourse = new Course({
      title: courseData.title,
      description: courseData.description,
      creator: 'anonymous-user',
    });

    const savedCourse = await newCourse.save();
    const moduleIds = [];

    for (const moduleData of courseData.modules) {
      const newModule = new Module({
        title: moduleData.title,
        course: savedCourse._id,
      });
      const savedModule = await newModule.save();
      const lessonIds = [];

      for (const lessonTitle of moduleData.lessons) {
        const newLesson = new Lesson({
          title: lessonTitle,
          module: savedModule._id,
        });
        const savedLesson = await newLesson.save();
        lessonIds.push(savedLesson._id);
      }

      savedModule.lessons = lessonIds;
      await savedModule.save();
      moduleIds.push(savedModule._id);
    }

    savedCourse.modules = moduleIds;
    await savedCourse.save();

    // 5. --- Send Response to Frontend ---
    res.status(201).json({
      message: 'Course generated and saved successfully!',
      courseId: savedCourse._id,
    });
  } catch (error) {
    console.error('Error in course generation:', error);
    if (error.message.includes('SAFETY')) {
         return res.status(400).json({ message: 'The topic triggered the AI\'s safety filters. Please try a different topic.' });
    }
    res.status(500).json({ message: 'An error occurred on the server during course generation.' });
  }
};

const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate({
      path: 'modules',
      model: 'Module',
      populate: {
        path: 'lessons',
        model: 'Lesson',
      },
    });

    if (course) {
      // FIX: Add a return statement here to stop execution
      return res.json(course);
    } else {
      // And also add one here for good practice
      return res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    console.error('Error fetching course:', error);
    // And here as well
    return res.status(500).json({ message: 'Server error' });
  }
};


export { generateCourse, getCourseById };