import React from "react";
import "./Profile.css";

const Profile = ({
  visible,
  onClose,
  isGuest = true,
  onSignInClick,
  onSignUpClick,
  onLogoutClick,
}) => {
  if (!visible) return null;

  // 🔐 Get logged-in user
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  return (
    <div className="profile-modal-backdrop" onClick={onClose}>
      <div
        className="profile-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="profile-close-btn" onClick={onClose}>
          ✕
        </button>

        <div className="profile-content">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="Profile Avatar"
            className="profile-avatar"
          />

          {/* 👤 GUEST USER */}
          {isGuest || !user ? (
            <>
              <h2 className="profile-name">Guest User</h2>
              <p className="profile-email">guest@netflix.com</p>

              <p className="profile-note">
                You're currently browsing as a guest. Sign in to save
                your preferences and access your personal watchlist.
              </p>

              <div className="profile-actions">
                <button
                  className="action-btn signin-btn"
                  onClick={() => {
                    onSignInClick();
                    onClose();
                  }}
                >
                  🔐 Sign In
                </button>

                <button
                  className="action-btn signup-btn"
                  onClick={() => {
                    onSignUpClick();
                    onClose();
                  }}
                >
                  ✏️ Create Account
                </button>
              </div>
            </>
          ) : (
            /* ✅ LOGGED-IN USER */
            <>
              <h2 className="profile-name">{user.username}</h2>
              <p className="profile-email">{user.email}</p>

              <div className="profile-info">
                <div className="info-item">
                  <span className="info-label">Membership</span>
                  <span className="info-value">Premium</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Status</span>
                  <span className="info-value active">Active</span>
                </div>
              </div>

              <div className="profile-actions">
                <button
                  className="action-btn signout-btn"
                  onClick={() => {
                    onLogoutClick(); // 🔥 TRIGGER CONFIRM DIALOG
                    onClose();
                  }}
                >
                  🚪 Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
