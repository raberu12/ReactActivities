import { useState } from "react";
import "../Styles/search.css"
function Search() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async () => {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?s=${query}&apikey=dc726908`
      );
      const data = await response.json();
      if (data.Search) {
        setMovies(data.Search);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <h1>Search for Movies Here!</h1>
      </div>
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchMovies}>Search</button>
        <div className="movie-container">
          {movies.map((movie) => (
            <div key={movie.imdbID}>
              <h2>{movie.Title}</h2>
              <p>{movie.Year}</p>
              <img src={movie.Poster} alt={movie.Title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Search;
