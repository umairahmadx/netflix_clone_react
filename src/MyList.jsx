import React, { useEffect, useState } from "react";
import "./MyList.css";
import Snackbar from "./Snackbar";
import ConfirmDialog from "./ConfirmDialog";
import { fetchMyList, removeFromMyList } from "./api.js"; // adjust path if needed

const MyList = () => {
  const [myList, setMyList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [snack, setSnack] = useState({
    visible: false,
    message: "",
    type: "info",
  });

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // 🔄 FETCH MY LIST ON LOAD
  useEffect(() => {
    const loadMyList = async () => {
      try {
        const data = await fetchMyList();
        setMyList(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadMyList();
  }, []);

  // 🗑 REMOVE CONFIRM
  const handleRemove = (movie) => {
    setSelectedMovie(movie);
    setConfirmOpen(true);
  };

  // ✅ REMOVE FROM BACKEND + UI
  const handleRemoveConfirmed = async () => {
    if (!selectedMovie) return;

    try {
      await removeFromMyList(selectedMovie._id);

      setMyList((prev) =>
        prev.filter((item) => item._id !== selectedMovie._id)
      );

      setSnack({
        visible: true,
        message: `${selectedMovie.title} removed from My List`,
        type: "info",
      });
    } catch (err) {
      console.error(err);
      setSnack({
        visible: true,
        message: "Failed to remove movie",
        type: "error",
      });
    } finally {
      setConfirmOpen(false);
      setSelectedMovie(null);
    }
  };

  const onSnackClose = () =>
    setSnack((prev) => ({ ...prev, visible: false }));

  // ⏳ LOADING STATE
  if (loading) {
    return (
      <div className="mylist-empty">
        <h2>Loading your list...</h2>
      </div>
    );
  }

  // 📭 EMPTY STATE
  if (myList.length === 0) {
    return (
      <div className="mylist-empty">
        <h2>Your My List is empty</h2>
        <p>Add movies and shows to watch later.</p>
      </div>
    );
  }

  return (
    <div className="mylist-page">
      <h1>My List</h1>

      <div className="mylist-grid">
        {myList.map((movie) => (
          <div key={movie._id} className="mylist-card-wrapper">
            <div className="mylist-card">
              <img
                src={movie.poster}
                alt={movie.title}
                className="mylist-poster"
              />

              {/* HOVER OVERLAY */}
              <div className="mylist-overlay">
                <div className="overlay-top">
                  <button className="play-btn-mylist" title="Play">
                    ▶
                  </button>
                </div>

                <div className="overlay-info">
                  <h3>{movie.title}</h3>
                  <p className="mylist-rating">
                    ⭐ {movie.rating || "8.7"} / 10
                  </p>
                  <p className="mylist-year">{movie.year}</p>
                  <p className="mylist-genres">
                    {Array.isArray(movie.genre)
                      ? movie.genre.join(", ")
                      : movie.genre}
                  </p>
                  <p className="mylist-description">
                    {movie.description}
                  </p>

                  <button
                    className="remove-btn-mylist"
                    onClick={() => handleRemove(movie)}
                  >
                    ✓ In My List
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CONFIRM DIALOG */}
      <ConfirmDialog
        visible={confirmOpen}
        title={
          selectedMovie
            ? `Remove ${selectedMovie.title}?`
            : "Remove from My List?"
        }
        message={
          selectedMovie
            ? `Are you sure you want to remove "${selectedMovie.title}" from your list?`
            : ""
        }
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

export default MyList;
