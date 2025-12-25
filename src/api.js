// API service for backend calls
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
// Get token from localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token
    ? { Authorization: `Bearer ${token}` }
    : {};
};

// Cache for movies
let moviesCache = null;
let isFetching = false;

// Utility function to shuffle array (Fisher-Yates shuffle)
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Fetch movies once and cache them
const fetchMoviesFromAPI = async () => {
  if (moviesCache) {
    return moviesCache;
  }

  if (isFetching) {
    // Wait for the current fetch to complete
    while (isFetching) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    return moviesCache;
  }

  try {
    isFetching = true;
    const response = await fetch(`${API_BASE_URL}/movies`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    moviesCache = await response.json();
    return moviesCache;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  } finally {
    isFetching = false;
  }
};

// Fetch all movies
export const fetchAllMovies = async () => {
  return await fetchMoviesFromAPI();
};

// Fetch all movies for a category (returns filtered movies shuffled)
export const fetchMoviesByCategory = async (category = "trending") => {
  const data = await fetchMoviesFromAPI();
  const filtered = data.filter((movie) => movie.category === category);
  return shuffleArray(filtered);
};

// Fetch a single movie by ID
export const fetchMovieById = async (id) => {
  const data = await fetchMoviesFromAPI();
  return data.find((m) => m._id === id) || null;
};

// 🔐 REGISTER USER
export const registerUser = async (data) => {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

// 🔐 LOGIN USER
export const loginUser = async (data) => {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};


// ❤️ GET MY LIST
export const fetchMyList = async () => {
  const res = await fetch(`${API_BASE_URL}/users/my-list`, {
    method: "GET",
    headers: {
      ...getAuthHeaders(),
    },
  });

  if (!res.ok) throw new Error("Unauthorized");
  return res.json();
};

// ❤️ ADD MOVIE TO MY LIST
export const addToMyList = async (movieId) => {
  const res = await fetch(`${API_BASE_URL}/users/my-list/${movieId}`, {
    method: "POST",
    headers: {
      ...getAuthHeaders(),
    },
  });

  return res.json();
};

// ❤️ REMOVE MOVIE FROM MY LIST
export const removeFromMyList = async (movieId) => {
  const res = await fetch(`${API_BASE_URL}/users/my-list/${movieId}`, {
    method: "DELETE",
    headers: {
      ...getAuthHeaders(),
    },
  });

  return res.json();
};


// Fetch hero movie (featured)
export const fetchHeroMovie = async () => {
  const data = await fetchMoviesFromAPI();
  return data.find((movie) => movie.featured === true) || data[0] || null;
};
