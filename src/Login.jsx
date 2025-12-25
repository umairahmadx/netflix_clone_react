import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "./api.js";
import "./Login.css";

const Login = ({ closePopup, isSignUp = false, setIsLoggedIn }) => {
  const [isLogin, setIsLogin] = useState(!isSignUp);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 🔐 LOGIN
  const userLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser({ email, password });

      if (!data.token) {
        alert(data.message || "Login failed");
        return;
      }

      // ✅ Store auth
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // 🔥 TELL REACT USER IS LOGGED IN
      setIsLoggedIn(true);

      closePopup();
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  // 📝 SIGNUP
  const userSignup = async (e) => {
    e.preventDefault();

    try {
      const data = await registerUser({ username, email, password });

      if (!data.message) {
        alert(data.message || "Signup failed");
        return;
      }

      alert("Account created! Please sign in.");
      setIsLogin(true);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="login-popup">
        <button className="close-btn" onClick={closePopup}>
          ✖
        </button>

        <h2>{isLogin ? "Sign In" : "Sign Up"}</h2>

        <form>
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            className="submit-btn"
            onClick={isLogin ? userLogin : userSignup}
          >
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p className="toggle-text">
          {isLogin ? "New to Netflix?" : "Already have an account?"}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? " Sign up now." : " Sign in."}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
