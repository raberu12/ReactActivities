import { useState, useEffect } from 'react';
import reactlogo from './assets/react.svg';
import vitelogo from '/vite.svg';
import './app.css';
import './des.css';

function App() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({});
  const [formValid, setFormValid] = useState(true);
  const [searchId, setSearchId] = useState('');
  const [search, setSearch] = useState(null);
  const [editStudent, setEditStudent] = useState(null);

  const handleAddStudent = () => {
    if (newStudent.id && newStudent.name && newStudent.age && newStudent.course) {
      const updatedStudents = [...students, newStudent];
      setStudents(updatedStudents);
      setNewStudent({});
    } else {
      setFormValid(false);
    }
  };

  const handleUpdateStudent = () => {
    if (newStudent.id && newStudent.name && newStudent.age && newStudent.course) {
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
      setFormValid(false)
    }
  };

  const handleCancelEdit = () => {
    setEditStudent(null);
    setNewStudent({});
  }

  const handleSearch = () => {
    const result = students.find((student) => student.id == searchId);
    setSearch(result || null);
  };

  const handleDeleteStudent = () => {
    console.log(editStudent);
    const updatedStudents = students.filter((student) => student.id !== search.id);
    console.log(updatedStudents); 
    setStudents(updatedStudents);
    setEditStudent(null);
    setSearch(null);
  }


  useEffect(() => {
    fetch('https://my-json-server.typicode.com/troy1129/jsonplaceholder/db')
      .then((response) => {
        if (!response.ok) {
          throw new Error('not ok');
        }
        return response.json();
      })
      .then((jsondata) => {
        setStudents(jsondata.data);
        console.log(jsondata);
      })
      .catch((error) => {
        console.error('error fetching data: ', error);
      });
  }, []);

  useEffect(() => {
    if (editStudent) {
      setNewStudent(editStudent);
    }
  }, [editStudent]);


  return (
      <div className='main'>
        <h1>CONTACT BOOK</h1>
        <div className='display'>
        <ul style={{ listStyle: 'none' }}>
          {students.map((student) => (
            <li key={student.id}>{student.id}</li>
          ))}
        </ul>
        </div>
        <div className="addstud">
          <div className="label">
            <label htmlFor="id">Contact Number </label>
            <br />
            <label htmlFor="name"> Name </label>
            <br />
            <label htmlFor="age"> Age </label>
            <br />
            <label htmlFor="course"> Course </label>
          </div>

          <div className='input'>
            <input id="id" type="text" value={newStudent.id || ''} onChange={(e) => setNewStudent({ ...newStudent, id: e.target.value })} />
            <br />
            <input id="name" type="text" value={newStudent.name || ''} onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })} />
            <br />
            <input id="age" type="text" value={newStudent.age || ''} onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })} />
            <br />
            <input id="course" type="text" value={newStudent.course || ''} onChange={(e) => setNewStudent({ ...newStudent, course: e.target.value })} />
          </div>
        </div>
        <div className='button'>
          {editStudent ? (
            <><button type="submit" style={{ marginLeft: 10 }} onClick={handleUpdateStudent}>
              Update
            </button>
              <button type="button" style={{ marginLeft: 10 }} onClick={handleCancelEdit}>
                Cancel
              </button></>
          ) : (
            <button type="submit" style={{ marginLeft: 10, width: 80 }} onClick={handleAddStudent}>
              Add
            </button>
          )}
        </div>

        {!formValid && <p>PLEASE FILL UP ALL THE FIELDS.</p>}
        <div className="searchstud">
          <label htmlFor="id">ID SEARCH</label>
          <br />
          <input id="search" type="text" value={searchId} onChange={(e) => setSearchId(e.target.value)} placeholder="Enter ID" />
          <button onClick={handleSearch} style={{ marginLeft: 10 }}>Search</button>
          {search ? (
            <div className="displaystud">
              <h3>Contact Details</h3>
              <p>ID: {search.id}</p>
              <p>Name: {search.name}</p>
              <p>Age: {search.age}</p>
              <p>Course: {search.course}</p>
              {!editStudent && (
                <>
                  <button onClick={() => setEditStudent(search)}>Edit</button>
                  <button onClick={handleDeleteStudent}>Delete</button>
                </>
              )}
            </div>
          ) : (
            <p>No student with that ID has been found!</p>
          )}
        </div>
      </div>
  );
}

export default App;
