import React from 'react';
import { useParams } from 'react-router-dom';

const LessonPage = () => {
  // We get both the courseId and lessonId from the URL
  const { courseId, lessonId } = useParams();

  return (
    <div className="page-container">
      <h2>Lesson Content</h2>
      <p>Displaying content for Lesson ID: <strong>{lessonId}</strong></p>
      <p>(From Course ID: {courseId})</p>
      {/* The LessonRenderer component will go here later */}
    </div>
  );
};

export default LessonPage;