import React from "react";

const Content = ({ courses }) => {
    const courseName = courses.map(course => (
    <div key={course.id}>
      <h2>{course.name}</h2>
      <ul>
        {course.parts.map(part => (
          <li key={part.id}>
            {part.name} - {part.exercises} exercises
          </li>
        ))}
      </ul>
      <p><strong>Total of {course.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</strong></p>
    </div>
  ))
  
  return (
    <div>
      <ul>
        {courseName}
      </ul>
    </div>
  );
};

export default Content;
