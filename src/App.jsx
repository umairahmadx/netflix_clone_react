import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home'
import Navbar from './Navbar.jsx'
import ProductList from "./Productlist";
import Favourite from './Favourite'
import Cart from './Cart'
import Login from './Login'
import Addproduct from './Addproduct'
import { useState, useEffect } from "react";

const App = () => {
  const [cartCount, setCartCount] = useState(
    parseInt(localStorage.getItem("cartCount")) || 0);
  const [favCount, setFavCount] = useState(
    parseInt(localStorage.getItem("favCount")) || 0);
    
  useEffect(() => {
    localStorage.setItem("cartCount", cartCount);
  }, [cartCount]);
  useEffect(() => {
    localStorage.setItem("favCount", favCount);
  }, [favCount]);

  const [cartItems, setCartItems] = useState(
  JSON.parse(localStorage.getItem("cartItems")) || []);
  const [favItems, setFavItems] = useState(
  JSON.parse(localStorage.getItem("favItems")) || []);

// Save to localStorage whenever updated
  useEffect(() => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));}, [cartItems]);
  useEffect(() => {
  localStorage.setItem("favItems", JSON.stringify(favItems));}, [favItems]);

//login/signup
  const [showLogin, setShowLogin] = useState(false);

   return (
    <> <BrowserRouter>
     <Navbar cartCount={cartCount} 
      favCount={favCount}
      cartProducts={cartItems.length} 
      favProducts={favItems.length}
      setShowLogin={setShowLogin}/>

       {/* Login popup over everything */}
      {showLogin && (
        <Login closePopup={() => setShowLogin(false)} />
      )}

      {/* ROUTES */}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              cartCount={cartCount}
              setCartCount={setCartCount}
              favCount={favCount}
              setFavCount={setFavCount}
              cartItems={cartItems}
              setCartItems={setCartItems}
              favItems={favItems}
              setFavItems={setFavItems}
            />
          }
        />

        <Route
            path="/favourites"
           element={<Favourite favCount={favCount} favItems={favItems} />}/>

       <Route
          path="/cart"
          element={<Cart cartCount={cartCount} cartItems={cartItems} />}/>

        <Route
        path="/addproduct" element ={<Addproduct />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App