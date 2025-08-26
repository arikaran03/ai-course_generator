import React from 'react';
import PromptForm from '../components/PromptForm';

const NewCoursePage = () => {
  return (
    <div className="page-container">
      <h2>Create a New Course</h2>
      <p>Enter a topic below and let AI build a structured learning path for you.</p>
      <PromptForm />
    </div>
  );
};

export default NewCoursePage;