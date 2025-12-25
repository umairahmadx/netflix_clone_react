import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NetflixNavbar from "./NetflixNavbar";
import Home from "./Home";
import MyList from "./MyList";
import Login from "./Login";
import { fetchMyList } from "./api"; // 🔥 ADD THIS

const App = () => {
  // 🔐 AUTH STATE (SOURCE OF TRUTH)
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  // ❤️ My List (BACKEND-DRIVEN)
  const [myList, setMyList] = useState([]);

  // Login modal state
  const [showLogin, setShowLogin] = useState(false);
  const [loginMode, setLoginMode] = useState("signin");

  // 🔄 LOAD MY LIST FROM BACKEND ON LOGIN
  useEffect(() => {
    const loadMyList = async () => {
      if (!isLoggedIn) {
        setMyList([]);
        return;
      }

      try {
        const data = await fetchMyList();
        setMyList(data || []);
      } catch (err) {
        console.error("Failed to load My List", err);
        setMyList([]);
      }
    };

    loadMyList();
  }, [isLoggedIn]);

  return (
    <BrowserRouter>
      {/* NETFLIX NAVBAR */}
      <NetflixNavbar
        myListCount={myList.length}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setShowLogin={setShowLogin}
        setLoginMode={setLoginMode}
      />

      {/* LOGIN MODAL */}
      {showLogin && (
        <Login
          closePopup={() => setShowLogin(false)}
          isSignUp={loginMode === "signup"}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}

      {/* ROUTES */}
      <Routes>
        <Route
          path="/"
          element={<Home myList={myList} setMyList={setMyList} />}
        />

        <Route
          path="/my-list"
          element={
            isLoggedIn ? (
              <MyList myList={myList} setMyList={setMyList} />
            ) : (
              <Home myList={myList} setMyList={setMyList} />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
