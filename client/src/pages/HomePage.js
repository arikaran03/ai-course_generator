import React from 'react';
import PromptForm from '../components/PromptForm';
const HomePage = () => {
  return (
    <div className="page-container">
      <h2>Create a New Course</h2>
      <p>Enter a topic below to get started.</p>
      <PromptForm />
    </div>
  );
};

export default HomePage;