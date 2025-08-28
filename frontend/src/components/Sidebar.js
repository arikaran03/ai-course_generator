import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCourses } from '../context/CourseContext.js'; // 1. Import the context hook

const Sidebar = () => {

  // 2. Get courses and error directly from the global context\
  const { courses, error } = useCourses();
  // 3. The useEffect and useState for fetching are no longer needed here!
  
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