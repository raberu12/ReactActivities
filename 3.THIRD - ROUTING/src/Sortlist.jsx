import { useEffect, useState } from "react";
import Display from "./Displaysortlist.jsx";
import "./App.css";

function Sortlist() {
  const [students, setStudent] = useState([
    { idNum: 13100270, name: "Patrick", age: 27, course: "BS-CpE" },
    { idNum: 12612790, name: "Tonie", age: 25, course: "BS-ChE" },
    { idNum: 13502187, name: "Xia", age: 22, course: "BS-CS" },
    { idNum: 17426806, name: "Peter", age: 23, course: "BS-IT" },
    { idNum: 21075329, name: "Josh", age: 23, course: "BS-HRM" },
  ]);

  const [idInput, setIdInput] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInvalid(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [isInvalid]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    if (/^\d+$/.test(inputValue)) {
      setIdInput(inputValue);
      setIsInvalid(false);
    } else {
      setIdInput("");
      setIsInvalid(true);
    }
  };
  const borderStyle = {
    border: `2px solid ${isInvalid ? "red" : "transparent"}`,
    boxShadow: `0 0 5px ${isInvalid ? "red" : "transparent"}`,
    transition: "border-color 0.5s ease, box-shadow 0.5s ease",
  };

  const filteredStudents = students.filter((student) => {
    const studentId = student.idNum.toString();
    return studentId.startsWith(idInput);
  });

  return (
    <>
      <h1>Input Student ID #:</h1>
      <input
        value={idInput}
        type="text"
        onChange={handleInputChange}
        style={borderStyle}
      ></input>
      <div className="card">
      <Display students={filteredStudents} />
      </div>
    </>
  );
}

export default Sortlist;
