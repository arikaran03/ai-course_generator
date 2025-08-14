// @route   POST /api/courses/generate

const generateCourse = (req, res) => {
    // For now, we'll just confirm we received the request
    // We will get the topic from the request body later
    const { topic } = req.body;

    if (!topic) {
        // If no topic is provided, send a 400 Bad Request error
        return res.status(400).json({ message: 'Please provide a topic' });
    }
    
    // Send a success response with the received topic
    res.status(201).json({     
        message: `Successfully received request to generate a course on: ${topic}`,
    });
};

export default  generateCourse;