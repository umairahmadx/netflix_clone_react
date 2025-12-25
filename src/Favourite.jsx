import React, { useState } from 'react'
import { Link } from "react-router-dom";
import "./Favourite.css"

const Favourite = ({ favItems, favCount }) => {

  // remove duplicate products by title
  const uniqueFavItems = Object.values(
    favItems.reduce((acc, item) => {
      if (!acc[item.title]) {
        acc[item.title] = item;
      }
      return acc;
    }, {})
  );

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

    <h2>Your Favourites ({favCount})</h2>

        {uniqueFavItems.length === 0 ? (
          <p>Your favourites is empty 😕</p>
        ) : (
          <div className="fav-items-container">
  {uniqueFavItems.map((item, index) => (
    <div className="fav-product" key={index}>
      <img src={item.img} alt={item.title} />

      <div>
        <h3>{item.title}</h3>
        <p>{item.weight}</p>
        <h4>Rs. {item.price}</h4>
      </div>
    </div>
  ))}
</div>

        )}

      
    </>
  )
}

export default Favourite