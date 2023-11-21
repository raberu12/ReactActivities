import React, { useState } from "react";

const SearchStudentForm = ({ searchId, setSearchId, handleSearch }) => {
  const handleChange = (e) => {
    setSearchId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="searchstud">
        <input
          type="text"
          name="searchId"
          placeholder="Search by ID"
          value={searchId}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchStudentForm;
