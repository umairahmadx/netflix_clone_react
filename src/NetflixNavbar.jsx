import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NetflixNavbar.css";
import Profile from "./Profile";
import ConfirmDialog from "./ConfirmDialog";

const NetflixNavbar = ({
  myListCount,
  isLoggedIn,
  setIsLoggedIn,
  setShowLogin,
  setLoginMode,
}) => {
  const [navBackground, setNavBackground] = useState("transparent");
  const [showProfile, setShowProfile] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setNavBackground(
        window.scrollY > 100 ? "rgba(0, 0, 0, 0.95)" : "transparent"
      );
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔐 SIGN IN
  const handleSignIn = () => {
    setLoginMode("signin");
    setShowLogin(true);
  };

  // 📝 SIGN UP
  const handleSignUp = () => {
    setLoginMode("signup");
    setShowLogin(true);
  };

  // 🚪 CONFIRM LOGOUT
  const handleLogoutConfirmed = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false); // 🔥 SOURCE OF TRUTH
    setShowProfile(false);
    setConfirmLogout(false);
    navigate("/");
  };

  return (
    <>
      <header className="netflix-header" style={{ background: navBackground }}>
        <div className="nav-container">
          {/* LEFT */}
          <div className="nav-left">
            <h1 className="netflix-logo">NETFLIX</h1>

            <nav>
              <Link to="/">Home</Link>
              {isLoggedIn && <Link to="/my-list">My List</Link>}
            </nav>
          </div>

          {/* RIGHT */}
          <div className="nav-right">
            <img
              className="profile-icon"
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
              alt="Profile"
              onClick={() => setShowProfile(true)}
              style={{ cursor: "pointer" }}
            />

            {!isLoggedIn ? (
              <button className="login-btn" onClick={handleSignIn}>
                Sign In
              </button>
            ) : (
              <button
                className="login-btn"
                onClick={() => setConfirmLogout(true)}
              >
                Logout
              </button>
            )}
          </div>
        </div>

        <Profile
          visible={showProfile}
          onClose={() => setShowProfile(false)}
          isGuest={!isLoggedIn}
          onSignInClick={handleSignIn}
          onSignUpClick={handleSignUp}
          onLogoutClick={() => setConfirmLogout(true)}
        />
      </header>

      {/* ⚠️ LOGOUT CONFIRMATION DIALOG */}
      <ConfirmDialog
        visible={confirmLogout}
        title="Sign out of Netflix?"
        message="You’ll need to sign in again to access your My List."
        onConfirm={handleLogoutConfirmed}
        onCancel={() => setConfirmLogout(false)}
      />
    </>
  );
};

export default NetflixNavbar;
