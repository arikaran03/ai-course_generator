// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const PromptForm = () => {
//   const [topic, setTopic] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevents the default form submission (page reload)
//     setError(''); // Clear previous errors

//     if (!topic.trim()) {
//       setError('Please enter a topic.');
//       return;
//     }

//     setLoading(true);

//     try {
//       // The URL for our backend endpoint
//       const apiUrl = 'http://localhost:5000/api/courses/generate';

//       // Make the POST request using axios
//       const response = await axios.post(apiUrl, { topic });

//       // Assuming the backend sends back the new course ID
//       // For now, our dummy backend doesn't, so we'll simulate it.
//       // We will update this later.
//       console.log('Backend Response:', response.data);
//       const newCourseId = response.data.courseId || 'temp123'; // Temporary fallback

//       // Redirect to the new course page
//       navigate(`/course/${newCourseId}`);
//     } catch (err) {
//       console.error('Error generating course:', err);
//       setError('Failed to generate course. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="prompt-form-container">
//       <form onSubmit={handleSubmit}>
//         <textarea
//           className="prompt-textarea"
//           value={topic}
//           onChange={(e) => setTopic(e.target.value)}
//           placeholder="e.g., Introduction to Quantum Physics"
//           disabled={loading}
//         />
//         <button type="submit" className="prompt-button" disabled={loading}>
//           {loading ? 'Generating...' : 'Generate Course'}
//         </button>
//       </form>
//       {error && <p className="error-message">{error}</p>}
//     </div>
//   );
// };

// export default PromptForm;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCourses } from '../context/CourseContext'; // 1. Import the context hook

const PromptForm = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { addCourse } = useCourses(); // 2. Get the addCourse function from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!topic.trim()) {
      setError('Please enter a topic.');
      return;
    }

    setLoading(true);

    try {
      const apiUrl = 'http://localhost:5000/api/courses/generate';
      const response = await axios.post(apiUrl, { topic });

      // 3. Add the newly created course to our global state
      // We need to fetch the full course object to add it
      const newCourseId = response.data.courseId;
      const newCourseResponse = await axios.get(`http://localhost:5000/api/courses/${newCourseId}`);
      addCourse(newCourseResponse.data);

      navigate(`/course/${newCourseId}`);
    } catch (err) {
      console.error('Error generating course:', err);
      setError('Failed to generate course. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="prompt-form-container">
      <form onSubmit={handleSubmit}>
        <textarea
          className="prompt-textarea"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., Introduction to Quantum Physics"
          disabled={loading}
        />
        <button type="submit" className="prompt-button" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Course'}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default PromptForm;