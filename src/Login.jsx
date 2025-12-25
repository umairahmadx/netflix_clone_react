import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Login.css";

const Login = ({ closePopup }) => {
  const [isLogin, setIsLogin] = useState(true);

  const[username, setUsername] = useState("");
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const navigate = useNavigate();
  

async function userLogin(e){
  e.preventDefault();
  try {
    const response = await fetch("http://localhost:7000/login",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email,password})
    });
    const data = await response.json();
    console.log(data);

    if (response.ok) {
      // save role and any token if returned
      if (data.role) localStorage.setItem("role", data.role);
      if (data.token) localStorage.setItem("token", data.token);

      // close popup (only if prop provided)
      if (typeof closePopup === "function") closePopup();

      // navigate to home
      navigate("/");
    } else {
      alert(data.error || "Login failed");
    }
  } catch (err) {
    console.error("Login error", err);
    alert("Something went wrong");
  }
}


async function userSignup(e) {
  e.preventDefault();

  const response = await fetch("http://localhost:7000/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, email, password })
  });

  const data = await response.json();

  if (response.ok) {
    // ✅ IMPORTANT PART
    localStorage.setItem("role", "user");

    // initialize counts
    localStorage.setItem("cartCount", 0);
    localStorage.setItem("favCount", 0);
    localStorage.setItem("cartItems", JSON.stringify([]));
    localStorage.setItem("favItems", JSON.stringify([]));

    closePopup(); // close login popup
  } else {
    alert(data.error);
  }
}


  
  return (
    <div className="popup-overlay">
      <div className="login-popup">
        {/* CLOSE BUTTON */}
        <button className="close-btn" onClick={closePopup}>✖</button>

        {/* HEADING */}
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>

        <form>
          {!isLogin && (
            <input type="text" placeholder="Full Name" value={username} onChange={(e) => setUsername(e.target.value)}/>
          )}

          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <button type="submit" className="submit-btn" onClick={isLogin? userLogin : userSignup}>
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? " Sign Up" : " Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;