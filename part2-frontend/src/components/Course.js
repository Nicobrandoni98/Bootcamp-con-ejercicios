import React from 'react';
import Header from "./Header";
import Content from "./Content";

const Course = ({courses}) => {
    return <div>
         <Header courses={courses}/>
         <Content courses={courses}/>
        </div>
}

export default Course;