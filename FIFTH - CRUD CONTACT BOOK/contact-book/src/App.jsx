import { useState, useEffect } from "react";
import "./app.css";
import "./des.css";
import StudentList from "./StudentList";
import AddStudentForm from "./AddStudentForm";
import SearchStudentForm from "./SearchStudentForm";
import StudentDetails from "./StudentDetails";

function App() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({});
  const [formValid, setFormValid] = useState(true);
  const [searchId, setSearchId] = useState("");
  const [search, setSearch] = useState(null);
  const [editStudent, setEditStudent] = useState(null);

  const handleAddStudent = () => {
    if (
      newStudent.id &&
      newStudent.name &&
      newStudent.age &&
      newStudent.course &&
      !students.some((student) => student.id === newStudent.id)
    ) {
      const updatedStudents = [...students, newStudent];
      setStudents(updatedStudents);
      setNewStudent({});
    } else {
      setFormValid(false);
    }
  };

  const handleUpdateStudent = () => {
    if (
      newStudent.id &&
      newStudent.name &&
      newStudent.age &&
      newStudent.course
    ) {
      const updatedStudents = students.map((student) => {
        if (student.id === editStudent.id) {
          return newStudent;
        }
        return student;
      });
      setStudents(updatedStudents);
      setNewStudent({});
      setEditStudent(null);
      setSearch(newStudent);
    } else {
      setFormValid(false);
    }
  };

  const handleCancelEdit = () => {
    setEditStudent(null);
    setNewStudent({});
  };

  const handleSearch = () => {
    const result = students.find((student) => student.id == searchId);
    setSearch(result);
  };

  const handleDeleteStudent = (student) => {
    const updatedStudents = students.filter((s) => s.id !== student.id);
    setStudents(updatedStudents);
    setEditStudent(null);
    setSearch(null);
  };

  useEffect(() => {
    fetch("https://my-json-server.typicode.com/troy1129/jsonplaceholder/db")
      .then((response) => {
        if (!response.ok) {
          throw new Error("not ok");
        }
        return response.json();
      })
      .then((jsondata) => {
        setStudents(jsondata.data);
        console.log(jsondata);
      })
      .catch((error) => {
        console.error("error fetching data: ", error);
      });
  }, []);

  useEffect(() => {
    if (editStudent) {
      setNewStudent(editStudent);
    }
  }, [editStudent]);

  return (
    <div>
      <h1>CONTACT BOOK</h1>
      <div className="main">
        <div className="submain">
          <StudentList students={students} />
          <AddStudentForm
            students={students}
            newStudent={newStudent}
            setNewStudent={setNewStudent}
            formValid={formValid}
            setFormValid={setFormValid}
            handleAddStudent={handleAddStudent}
            handleUpdateStudent={handleUpdateStudent}
            handleCancelEdit={handleCancelEdit}
            editStudent={editStudent}
          />
        </div>
        <div className="submain2">
          <SearchStudentForm
            searchId={searchId}
            setSearchId={setSearchId}
            handleSearch={handleSearch}
          />
          {search && (
            <StudentDetails
              student={search}
              setEditStudent={setEditStudent}
              handleDeleteStudent={handleDeleteStudent}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
