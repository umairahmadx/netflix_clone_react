import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import { fetchMoviesByCategory, fetchAllMovies } from "./api";
import "./MovieRow.css";

const MovieRow = ({ title, category = "trending", filterGenre = null, myList, setMyList }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      try {
        let data;
        
        if (filterGenre) {
          // Filter by genre
          const allMovies = await fetchAllMovies();
          data = allMovies.filter((movie) =>
            Array.isArray(movie.genre) ? movie.genre.includes(filterGenre) : movie.genre === filterGenre
          );
        } else {
          // Fetch all movies and shuffle
          data = await fetchMoviesByCategory(category);
        }
        
        setMovies(data || []);
      } catch (error) {
        console.error("Failed to load movies:", error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [category, filterGenre]);

  if (loading) return <div className="movie-row"><p>Loading...</p></div>;

  return (
    <div className="movie-row">
      <h2>{title}</h2>

      <div className="row-posters">
        {movies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            myList={myList}
            setMyList={setMyList}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieRow;
