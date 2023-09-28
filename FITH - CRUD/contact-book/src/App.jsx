import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react';

function App() {

  const [students, setStudents] = useState([]);
  
  useEffect(()=>{
    fetch('https://my-json-server.typicode.com/troy1129/jsonplaceholder/db')
    .then((response) => {
      if(!response.ok){
        throw new Error('NOT OK');
      }
      return response.json()
    })
    .then((jsonData) => {
      setStudents(jsonData.data);
      console.log(jsonData);
    })
    .catch((error) => {
      console.error('ERROR FETCHING DATA: ', error);
    });
  },[]);

  return (
    <>
    <div>
      <h1>Contact Book</h1>
      <ul style={{listStyle: "none"}}>
        {students.map((index)=> (
          <li key = {index.id}>{index.id}</li>
        ))}
      </ul>
      <form action="">
        <label htmlFor="id">Contact Number </label>
        <input id='id' type="text" />
        <label htmlFor="name"> Name </label>
        <input id='name' type="text" />
        <label htmlFor="age"> Age </label>
        <input id='age' type="text" />
        <label htmlFor="course"> Course </label>
        <input id='course' type="text" />
        <input type="submit" style={{marginLeft: 10, padding: 300}} />
      </form>
    </div>
    </>
  );
}

export default App
