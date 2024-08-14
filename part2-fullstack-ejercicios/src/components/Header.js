import React from 'react';

const Header = ({courses}) => {       
    return (
        <div>
            {courses.map(course => (
                <h1 key={course.id}>{course.name}</h1>
            ))}
        </div>
    )
}

export default Header;