import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.js';
import CoursePage from './pages/CoursePage.js';

import './App.css';

const App = () => {
  return (
      <div className='App'>
        <h1>Text-to-Learn Course Generator</h1>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/course/:courseId" element={<CoursePage />} />
        </Routes>
      </div>
    
  );
}

export default App;