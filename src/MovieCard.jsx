import React, { useState } from "react";
import "./MovieCard.css";
import Snackbar from "./Snackbar";
import ConfirmDialog from "./ConfirmDialog";
import {
  addToMyList,
  removeFromMyList,
  fetchMyList,
} from "./api";

const MovieCard = ({ movie, myList, setMyList }) => {
  const [snack, setSnack] = useState({
    visible: false,
    message: "",
    type: "info",
  });
  const [confirmOpen, setConfirmOpen] = useState(false);

  const isLoggedIn = !!localStorage.getItem("token");
  const isInList = myList.some((item) => item._id === movie._id);

  // ➕ ADD TO MY LIST (BACKEND)
  const handleAdd = async () => {
    if (!isLoggedIn) {
      setSnack({
        visible: true,
        message: "Sign in to add movies to My List",
        type: "warning",
      });
      return;
    }

    try {
      await addToMyList(movie._id);

      // 🔄 REFRESH LIST FROM BACKEND
      const updatedList = await fetchMyList();
      setMyList(updatedList);

      setSnack({
        visible: true,
        message: `${movie.title} added to My List`,
        type: "success",
      });
    } catch (err) {
      console.error(err);
      setSnack({
        visible: true,
        message: "Failed to add movie",
        type: "error",
      });
    }
  };

  // ❌ REMOVE FROM MY LIST (BACKEND)
  const handleRemoveConfirmed = async () => {
    try {
      await removeFromMyList(movie._id);

      // 🔄 REFRESH LIST FROM BACKEND
      const updatedList = await fetchMyList();
      setMyList(updatedList);

      setConfirmOpen(false);
      setSnack({
        visible: true,
        message: `${movie.title} removed from My List`,
        type: "info",
      });
    } catch (err) {
      console.error(err);
      setSnack({
        visible: true,
        message: "Failed to remove movie",
        type: "error",
      });
    }
  };

  const handleRemoveClick = () => {
    if (!isLoggedIn) {
      setSnack({
        visible: true,
        message: "Sign in to manage your My List",
        type: "warning",
      });
      return;
    }
    setConfirmOpen(true);
  };

  const onSnackClose = () =>
    setSnack((prev) => ({ ...prev, visible: false }));

  return (
    <div className="movie-card">
      <img src={movie.poster} alt={movie.title} />

      {/* NETFLIX-STYLE HOVER OVERLAY */}
      <div className="movie-overlay">
        <button className="play-btn" aria-label={`Play ${movie.title}`}>
          ▶
        </button>

        <div className="movie-info">
          <h3 className="movie-title">{movie.title}</h3>
          <p className="movie-meta">
            {Array.isArray(movie.genre)
              ? movie.genre.join(", ")
              : movie.genre}{" "}
            • {movie.year || "2019"}
          </p>
          <p className="movie-overview">
            {movie.description ||
              "A gripping tale of mystery and suspense that captivates audiences."}
          </p>
        </div>

        <div className="overlay-bottom">
          <button
            className={`add-btn ${isInList ? "in-list" : ""} state-change`}
            onClick={isInList ? handleRemoveClick : handleAdd}
            aria-label={
              isInList ? "Remove from My List" : "Add to My List"
            }
          >
            <span className="btn-icon">
              {isInList ? "✓" : "+"}
            </span>
          </button>

          <span className="rating">
            ⭐ {movie.rating || "8.7"}
          </span>
        </div>
      </div>

      {/* CONFIRM REMOVE */}
      <ConfirmDialog
        visible={confirmOpen}
        title={`Remove ${movie.title}?`}
        message={`Are you sure you want to remove "${movie.title}" from your list?`}
        onConfirm={handleRemoveConfirmed}
        onCancel={() => setConfirmOpen(false)}
      />

      {/* SNACKBAR */}
      <Snackbar
        message={snack.message}
        visible={snack.visible}
        type={snack.type}
        onClose={onSnackClose}
      />
    </div>
  );
};

export default MovieCard;
