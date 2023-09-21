import { useState } from 'react';
import Display from './Displaysortlist.jsx';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function Sortlist() {
  const [students, setStudent] = useState([
    { idNum: 13100270, name: "Patrick", age: 27, course: "BS-CpE" },
    { idNum: 12612790, name: "Tonie", age: 25, course: "BS-ChE" },
    { idNum: 13502187, name: "Xia", age: 22, course: "BS-CS" },
    { idNum: 17426806, name: "Peter", age: 23, course: "BS-IT" },
    { idNum: 21075329, name: "Josh", age: 23, course: "BS-HRM" },
  ]);

  const [idInput, setIdInput] = useState("");

  const isSame = idInput === "" ? students : students.filter(student => student.idNum === parseInt(idInput));

  console.log(isSame);

  return (
    <>
      <p>Input Student ID #:</p>
      <input value={idInput} onChange={e => setIdInput(e.target.value)}></input>
      <Display students={isSame} />
    </>
  );
}

export default Sortlist;
