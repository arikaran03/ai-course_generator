import React from 'react';
import { useParams } from 'react-router-dom';

const CoursePage = () => {
  const { courseId } = useParams();

  return (
    <div className="page-container">
      <h2>Course Details</h2>
      <p>Displaying details for Course ID: <strong>{courseId}</strong></p>
      {/* The course modules and lessons will be rendered here later */}
    </div>
  );
};

export default CoursePage;