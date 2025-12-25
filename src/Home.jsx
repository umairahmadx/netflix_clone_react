import React, { useEffect, useState } from 'react'
import "./Home.css"
import Productlist from './Productlist.jsx'
const Home =  ({cartCount, setCartCount, favCount, setFavCount, cartItems, setCartItems, favItems, setFavItems  }) => {
  return (
    <> 
      
      <div className="home-container">
      <div className="info-box">
        <h2>Groceries delivered in 10 minutes</h2>
        <p>Fresh vegetables, dairy, snacks, and more at your doorstep faster than ever</p>

        <div className="features">
          <span>⚡ 10-min delivery</span>
          <span>🛒 Instant checkout</span>
          <span>✔ 100% quality guaranteed</span>
        </div>
      </div>
    </div>
        <Productlist 
        favCount = {favCount}  setFavCount = {setFavCount}
        cartCount = {cartCount} setCartCount = {setCartCount}
        cartItems={cartItems}  setCartItems={setCartItems}
        favItems={favItems}   setFavItems={setFavItems} 
        />
    </>
    
    
  )
}

export default Home;