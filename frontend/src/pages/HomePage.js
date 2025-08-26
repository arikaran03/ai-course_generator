import React from 'react';
import PromptForm from '../components/PromptForm';
import CoursePage from './CoursePage';
import { Link } from 'react-router-dom';
const HomePage = () => {
  return (
    <div className="page-container">
      <h2>Welcome to Text-to-Learn</h2>
      <p>Your AI-powered course generation tool.</p>
      <p>Select a course from the sidebar to view its content, or create a new one to get started.</p>
      <Link to="/new-course" className="prompt-button" style={{ textDecoration: 'none', marginTop: '20px' }}>
        Create Your First Course
      </Link>
    </div>
  );
};

export default HomePage;