import {React, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Sidebar = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/courses');
        setCourses(response.data);
      } catch (err) {
        console.error('Failed to fetch courses for sidebar', err);
        setError('Could not load courses.');
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>My Courses</h3>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/new-course" className="sidebar-link new-course-link">
          + Create New Course
        </NavLink>
        <hr />
        {error && <p className="error-message">{error}</p>}
        {courses.map(course => (
          <NavLink
            key={course._id}
            to={`/course/${course._id}`}
            className="sidebar-link"
          >
            {course.title}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;