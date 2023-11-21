import React, { useState, useEffect } from "react";
import "./App.css"

function App() {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);

  useEffect(() => {
    fetch("https://my-json-server.typicode.com/troy1129/jsonplaceholder/data")
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
        setFilteredStudents(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleInputChange = (event) => {
    const inputId = event.target.value;
    setStudentId(inputId);

    const filtered = students.filter((student) =>
      student.id.toString().includes(inputId)
    );

    setFilteredStudents(filtered);
  };

  return (
    <div className="app-container">
      <input
        type="text"
        placeholder="Enter student ID"
        value={studentId}
        onChange={handleInputChange}
      />
      
      {filteredStudents.length > 0 ? (
        <div>
          <h2>APIs Filter System</h2>
          <ul style={{listStyle: "none"}}>
            {filteredStudents.map((student) => (
              <li key={student.id}>
                ID: {student.id} | Name: {student.name} | Age: {student.age} | Course: {student.course}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No matching students found.</p>
      )}
    </div>
  );
}

export default App;
