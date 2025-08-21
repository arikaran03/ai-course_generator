import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LessonRenderer from '../components/LessonRenderer';

const LessonPage = () => {
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadLesson = async () => {
      try {
        setLoading(true);
        setError('');

        // 1. First, fetch the lesson data
        const getLessonUrl = `http://localhost:5000/api/lessons/${lessonId}`;
        const initialResponse = await axios.get(getLessonUrl);
        const currentLesson = initialResponse.data;

        // 2. Check if the lesson content is empty
        if (currentLesson?.content?.length === 0) {
          // If it's empty, call the endpoint to generate content
          const generateContentUrl = `http://localhost:5000/api/lessons/${lessonId}/generate-content`;
          const finalResponse = await axios.get(generateContentUrl);
          
          // --- THIS IS THE FIX ---
          // Previously, the code was not doing anything with the response from the POST request.
          // Now, we take the complete lesson data returned from the server (which includes the new content)
          // and use it to update our component's state. This ensures the UI re-renders with the new content immediately.
          // console.log(finalResponse);
          setLesson(finalResponse.data.lesson); 
        } else {
          // If content already exists, just use it
          setLesson(currentLesson);
        }

      } catch (err) {
        console.error('Error loading lesson:', err);
        setError('Failed to load lesson content. Please try again.');

      } finally {
        setLoading(false);
      }
    };

    if (lessonId) {
      loadLesson();
    }
  }, [lessonId]);

  if (loading) {
    return <div className="status-message">Loading or generating lesson...</div>;
  }

  if (error) {
    return <div className="status-message error-message">{error}</div>;
  }

  if (!lesson) {
    return <div className="status-message">Lesson not found.</div>;
  }

  return (
    <div className="page-container lesson-page-container">
      {/* We pass the lesson content to our new renderer component */}
      <LessonRenderer content={lesson.content} />
    </div>
  );
};

export default LessonPage;

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import LessonRenderer from '../components/LessonRenderer';

// const LessonPage = () => {
//   const { lessonId } = useParams();
//   const [lesson, setLesson] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const loadLesson = async () => {
//       try {
//         setLoading(true);
//         setError('');

//         // 1. First, fetch the lesson data
//         const getLessonUrl = `http://localhost:5000/api/lessons/${lessonId}`;
//         const initialResponse = await axios.get(getLessonUrl);
//         const currentLesson = initialResponse.data;

//         // 2. Check if the lesson content is empty
//         if (currentLesson.content && currentLesson.content.length === 0) {
//           // If it's empty, call the endpoint to generate content
//           const generateContentUrl = `http://localhost:5000/api/lessons/${lessonId}/generate-content`;
//           const finalResponse = await axios.post(generateContentUrl);
//           setLesson(finalResponse.data); // Set state with the newly generated content
//         } else {
//           // If content already exists, just use it
//           setLesson(currentLesson);
//         }

//       } catch (err) {
//         console.error('Error loading lesson:', err);
//         setError('Failed to load lesson content. Please try again.');

//       } finally {
//         setLoading(false);
//       }
//     };

//     if (lessonId) {
//       loadLesson();
//     }
//   }, [lessonId]);

//   if (loading) {
//     return <div className="status-message">Loading or generating lesson...</div>;
//   }

//   if (error) {
//     return <div className="status-message error-message">{error}</div>;
//   }

//   if (!lesson) {
//     return <div className="status-message">Lesson not found.</div>;
//   }

//   return (
//     <div className="page-container lesson-page-container">
//       {/* We pass the lesson content to our new renderer component */}
//       <LessonRenderer content={lesson.content} />
//     </div>
//   );
// };

// export default LessonPage;