import React, { useEffect } from "react";

const AddStudentForm = ({
  newStudent,
  setNewStudent,
  formValid,
  setFormValid,
  handleAddStudent,
  handleUpdateStudent,
  handleCancelEdit,
  editStudent,
  students,
}) => {
  useEffect(() => {
    const isValid = Object.values(newStudent).every((value) => value !== "");
    const idExists = students.some((student) => student.id === newStudent.id);

    console.log("isValid:", isValid);
    console.log("idExists:", idExists);

    setFormValid(isValid && !idExists);
  }, [newStudent, setFormValid, students]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update state
    setNewStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));

    const isValid = Object.values({ ...newStudent, [name]: value }).every(
      (val) => val !== ""
    );
    const idExists = students.some((student) => student.id === newStudent.id);

    console.log("Field:", name);
    console.log("isValid:", isValid);
    console.log("idExists:", idExists);

    setFormValid(isValid && !idExists);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editStudent) {
      handleUpdateStudent();
    } else {
      const idExists = students.some(
        (student) => student.id.toString() === newStudent.id
      );

      if (!idExists && formValid) {
        handleAddStudent();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="addstud">
      <input
        type="text"
        name="id"
        placeholder="ID"
        value={newStudent.id || ""}
        onChange={handleChange}
      />
      {!formValid && <p>ID already exists or some fields are empty!</p>}
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={newStudent.name || ""}
        onChange={handleChange}
      />
      <input
        type="text"
        name="age"
        placeholder="Age"
        value={newStudent.age || ""}
        onChange={handleChange}
      />
      <input
        type="text"
        name="course"
        placeholder="Course"
        value={newStudent.course || ""}
        onChange={handleChange}
      />
      <button type="submit" disabled={!formValid}>
        {editStudent ? "Update" : "Add"}
      </button>
      {editStudent ? (
        <button type="button" onClick={handleCancelEdit}>
          Cancel
        </button>
      ) : null}
    </form>
  );
};

export default AddStudentForm;
