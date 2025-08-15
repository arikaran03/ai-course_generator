import React from 'react';
import PromptForm from '../components/PromptForm';
import CoursePage from './CoursePage';
const HomePage = () => {
  return (
    <div className="page-container">
      <h2>Create a New Course</h2>
      <p>Enter a topic below to get started.</p>
      <PromptForm />
      {/* <CoursePage/> */}
    </div>
  );
};

export default HomePage;