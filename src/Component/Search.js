import React from "react";
import "../App.css";

function Search({ onSubmit }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(event.target.elements.filter.value);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search_form">
        <input name="filter" className="search_input" />
        <button className="search_btn">검색</button>
      </form>
    </div>
  );
}

export default Search;
