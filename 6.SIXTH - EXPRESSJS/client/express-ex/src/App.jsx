import React, { useState, useRef } from 'react';

function App() {
  const [query, setQuery] = useState("");
  const [students, setStudents] = useState([]);
  const inputRef = useRef();

  const searchStudents = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/users/${query}`
      );
      const data = await response.json();
      if (data) {
        setStudents(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchStudents();
    }
  };

  return (
    <div>
      <div>
        <h1>Search for Students Here!</h1>
      </div>
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          ref={inputRef}
        />
        <button onClick={searchStudents}>Search</button>
        <div>
            <div key={students.id}>
              <h2>{students.name}</h2>
              <p>{students.age}</p>
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
