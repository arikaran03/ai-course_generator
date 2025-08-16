import React, { useState, useEffect } from 'react';
import { useParams ,Link} from 'react-router-dom';
import axios from 'axios';

const CoursePage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Only run the fetch function if courseId is a valid value
    if (courseId) {
      const fetchCourse = async () => {
        try {
          setLoading(true);
          setError('');
          const apiUrl = `http://localhost:5000/api/courses/${courseId}`;
          const response = await axios.get(apiUrl);
          setCourse(response.data);
        } catch (err) {
          console.error('Error fetching course:', err);
          setError('Failed to load the course. Please try again.');
        } finally {
          setLoading(false);
        }
      };
      if(courseId){
        fetchCourse();
      }
    }
    // FIX: The dependency array must use the courseId variable from useParams
  }, [courseId]);

  if (loading) {
    return <div className="status-message">Loading course...</div>;
  }

  if (error) {
    return <div className="status-message error-message">{error}</div>;
  }

  if (!course) {
    return <div className="status-message">Course not found.</div>;
  }

  return (
    <div className="page-container course-details-container">
      <h2 className="course-title">{course.title}</h2>
      <p className="course-description">{course.description}</p>

      <div className="modules-list">
        {course.modules && course.modules.length > 0 ? (
          course.modules.map((module) => (
            <div key={module._id} className="module-card">
              <h3 className="module-title">{module.title}</h3>
              <ul className="lessons-list">
                {/* {module.lessons && module.lessons.map((lesson) => (
                  <li key={lesson._id} className="lesson-item">
                    {lesson.title}
                  </li>
                ))} */}
                {module.lessons && module.lessons.map((lesson) => (
                  // Wrap the list item content in a Link component
                  <li key={lesson._id} className="lesson-item">
                    <Link to={`/course/${courseId}/lesson/${lesson._id}`}>
                      {lesson.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>This course does not have any modules yet.</p>
        )}
      </div>
    </div>
  );
};

export default CoursePage;