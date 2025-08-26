import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.js';
import CoursePage from './pages/CoursePage.js';
import LessonPage from './pages/LessonPage.js';
import Sidebar from './components/Sidebar.js';
import NewCoursePage from './pages/NewCoursePage.js';

import './App.css';

const App = () => {
  return (
      <div className='App'>
        <h1>Text-to-Learn Course Generator</h1>
        <Sidebar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/new-course" element={<NewCoursePage />} />
          <Route path="/course/:courseId" element={<CoursePage />} />
          <Route path="/course/:courseId/lesson/:lessonId" element={<LessonPage />} />
        </Routes>
      </div>
    
  );
}

export default App;