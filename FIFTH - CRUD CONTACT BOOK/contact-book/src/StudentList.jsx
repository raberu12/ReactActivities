import React from "react";

const StudentList = ({ students }) => {
  return (
    <div>
      <ul style={{ listStyle: "none" }} className="display">
        {students.map((student) => (
          <li key={student.id}>{student.id}</li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
