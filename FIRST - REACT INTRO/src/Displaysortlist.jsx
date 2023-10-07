import React from 'react';
import './App.css'

function Display({students}){
    return( 
        <>
        {students.map((x)=>(
            <p key={x.idNum}>
                Name: {x.name} | ID Number: {x.idNum} | Age: {x.age} | Course: {x.course}
            </p>
        ))}
        </>
    );

}
export default Display;