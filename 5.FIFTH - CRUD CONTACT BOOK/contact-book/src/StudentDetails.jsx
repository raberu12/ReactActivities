import React from "react";

const StudentDetails = ({ student, setEditStudent, handleDeleteStudent }) => {
  return (
    <div className="display">
      <h2>Student Details</h2>
      <p>ID: {student.id}</p>
      <p>Name: {student.name}</p>
      <p>Age: {student.age}</p>
      <p>Course: {student.course}</p>
      <button type="button" onClick={() => setEditStudent(student)}>
        Edit
      </button>
      <button type="button" onClick={() => handleDeleteStudent(student)}>
        Delete
      </button>
    </div>
  );
};

export default StudentDetails;
