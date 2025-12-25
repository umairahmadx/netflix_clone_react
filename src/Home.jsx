import React, { useState, useEffect } from "react";
import "./Home.css";
import MovieRow from "./MovieRow";
import GenreFilter from "./GenreFilter";
import Snackbar from "./Snackbar";
import ConfirmDialog from "./ConfirmDialog";
import Footer from "./Footer";
import {
  fetchHeroMovie,
  addToMyList,
  removeFromMyList,
  fetchMyList,
} from "./api";

const Home = ({ myList, setMyList }) => {
  const [snack, setSnack] = useState({
    visible: false,
    message: "",
    type: "info",
  });
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [heroMovie, setHeroMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState(null);

  const isLoggedIn = !!localStorage.getItem("token");

  // 🎬 LOAD HERO MOVIE
  useEffect(() => {
    const loadHeroMovie = async () => {
      setLoading(true);
      try {
        const movie = await fetchHeroMovie();
        setHeroMovie(movie);
      } catch (error) {
        console.error("Failed to load hero movie:", error);
        setHeroMovie(null);
      } finally {
        setLoading(false);
      }
    };

    loadHeroMovie();
  }, []);

  if (loading || !heroMovie) {
    return (
      <div className="home">
        <p>Loading...</p>
      </div>
    );
  }

  const isHeroInList = myList.some(
    (item) => item._id === heroMovie._id
  );

  // ➕ ADD HERO MOVIE (BACKEND)
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
      await addToMyList(heroMovie._id);

      const updatedList = await fetchMyList();
      setMyList(updatedList);

      setSnack({
        visible: true,
        message: `${heroMovie.title} added to My List`,
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

  // ❌ REMOVE HERO MOVIE (BACKEND)
  const handleRemoveConfirmed = async () => {
    try {
      await removeFromMyList(heroMovie._id);

      const updatedList = await fetchMyList();
      setMyList(updatedList);

      setConfirmOpen(false);
      setSnack({
        visible: true,
        message: `${heroMovie.title} removed from My List`,
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

  // 🔁 HERO LIST BUTTON
  const handleListButtonClick = () => {
    if (!isLoggedIn) {
      setSnack({
        visible: true,
        message: "Sign in to manage your My List",
        type: "warning",
      });
      return;
    }

    if (isHeroInList) {
      setConfirmOpen(true);
    } else {
      handleAdd();
    }
  };

  const onSnackClose = () =>
    setSnack((prev) => ({ ...prev, visible: false }));

  return (
    <div className="home">
      {/* HERO SECTION */}
      <header className="hero" role="banner">
        <img
          src="https://occ-0-3646-3647.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABYG5MhBsWRL9UZvikzI4zs3Wm5hN8Fki2aigmCwz1Wjo69rjcXPXA6VVk6SFcfWvLKAwaJSdZI_EacLlFn0C9Opw6xsr4ghe0_D-.webp?r=8be"
          alt={`${heroMovie.title} poster`}
          className="hero-bg"
        />

        <div className="hero-content">
          <h1 className="hero-title">{heroMovie.title}</h1>
          <p className="hero-description">
            When a young boy vanishes, a small town uncovers a mystery
            involving secret experiments, terrifying supernatural
            forces, and one strange little girl.
          </p>

          <div className="hero-buttons">
            <button
              className="play-btn-hero"
              type="button"
              aria-label={`Play ${heroMovie.title}`}
            >
              ▶ Play
            </button>

            <button
              className={`list-btn-hero ${
                isHeroInList ? "in-list" : ""
              }`}
              type="button"
              onClick={handleListButtonClick}
              aria-label={
                isHeroInList
                  ? `Remove ${heroMovie.title} from My List`
                  : `Add ${heroMovie.title} to My List`
              }
            >
              <span className="btn-text">
                {isHeroInList ? "✓ My List" : "+ My List"}
              </span>
            </button>
          </div>
        </div>

        <div className="hero-fade" />
      </header>

      {/* CONFIRM REMOVE */}
      <ConfirmDialog
        visible={confirmOpen}
        title={`Remove ${heroMovie.title}?`}
        message={`Are you sure you want to remove "${heroMovie.title}" from your list?`}
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

      {/* GENRE FILTER */}
      <GenreFilter
        selectedGenre={selectedGenre}
        onGenreSelect={setSelectedGenre}
      />

      {/* GENRE MOVIES */}
      {selectedGenre && (
        <MovieRow
          title={`${selectedGenre} Movies`}
          filterGenre={selectedGenre}
          myList={myList}
          setMyList={setMyList}
        />
      )}

      {/* DEFAULT ROWS */}
      {!selectedGenre && (
        <>
          <MovieRow
            title="Trending Now"
            category="trending"
            myList={myList}
            setMyList={setMyList}
          />
          <MovieRow
            title="Netflix Originals"
            category="originals"
            myList={myList}
            setMyList={setMyList}
          />
          <MovieRow
            title="Top Rated"
            category="top-rated"
            myList={myList}
            setMyList={setMyList}
          />
          <MovieRow
            title="Popular"
            category="popular"
            myList={myList}
            setMyList={setMyList}
          />
        </>
      )}

      <Footer />
    </div>
  );
};

export default Home;
