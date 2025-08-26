import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// 1. Create the context
const CourseContext = createContext();

// 2. Create a custom hook to make it easy to use the context
export const useCourses = () => {
  return useContext(CourseContext);
};

// 3. Create the Provider component
export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');

  // Fetch initial courses when the provider loads
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/courses');
        setCourses(response.data);
      } catch (err) {
        console.error('Failed to fetch courses', err);
        setError('Could not load courses.');
      }
    };
    fetchCourses();
  }, []);

  // Function to add a new course to our global state
  const addCourse = (newCourse) => {
    setCourses(prevCourses => [newCourse, ...prevCourses]);
  };

  const value = {
    courses,
    error,
    addCourse,
  };

  return (
    <CourseContext.Provider value={value}>
      {children}
    </CourseContext.Provider>
  );
};