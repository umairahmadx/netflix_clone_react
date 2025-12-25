import React, { useState, useEffect } from "react";
import "./GenreFilter.css";
import { fetchAllMovies } from "./api";

const GenreFilter = ({ onGenreSelect, selectedGenre }) => {
  const [allGenres, setAllGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const movies = await fetchAllMovies();
        // Extract unique genres from all movies
        const genres = Array.from(
          new Set(movies.flatMap((movie) => movie.genre || []))
        ).sort();
        setAllGenres(genres);
      } catch (error) {
        console.error("Error loading genres:", error);
        setAllGenres([]);
      } finally {
        setLoading(false);
      }
    };

    loadGenres();
  }, []);

  if (loading) return <div className="genre-filter-section"><p>Loading genres...</p></div>;

  return (
    <div className="genre-filter-section">
      <div className="genre-filter-container">
        <h2>Browse by Genre</h2>
        <div className="genre-buttons">
          <button
            className={`genre-btn ${selectedGenre === null ? "active" : ""}`}
            onClick={() => onGenreSelect(null)}
          >
            All
          </button>
          {allGenres.map((genre) => (
            <button
              key={genre}
              className={`genre-btn ${selectedGenre === genre ? "active" : ""}`}
              onClick={() => onGenreSelect(genre)}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GenreFilter;
