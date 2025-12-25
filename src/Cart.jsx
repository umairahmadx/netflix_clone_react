import React, { useState } from "react";
import "./Cart.css";

const Cart = ({ cartItems }) => {
  // quantity map: { title: count }
  const [quantities, setQuantities] = useState(
    cartItems.reduce((acc, item) => {
      acc[item.title] = (acc[item.title] || 0) + 1;
      return acc;
    }, {})
  );

  const increaseQty = (title) => {
    setQuantities({ ...quantities, [title]: quantities[title] + 1 });
  };

  const decreaseQty = (title) => {
    if (quantities[title] > 1) {
      setQuantities({ ...quantities, [title]: quantities[title] - 1 });
    }
  };

  // TOTAL PRICE
  const totalPrice = cartItems.reduce((sum, item) => {
    const priceNumber = Number(
      String(item.price).replace(/[^0-9]/g, "")
    );
    return sum + priceNumber * quantities[item.title];
  }, 0);

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty 😕</p>
      ) : (
        <>
          <div className="cart-items-container">
            {Object.keys(quantities).map((title, index) => {
              const item = cartItems.find(p => p.title === title);

        return (
          <div className="cart-product">
            <div className="cart-product-left">
              <img src={item.img} alt={item.title} />

              <div>
                <h3>{item.title}</h3>
                <p>{item.weight}</p>
                <h4>Rs. {item.price}</h4>
              </div>
            </div>

            <div className="qty-controls">
              <button>-</button>
              <span>{item.quantity}</span>
              <button>+</button>
            </div>
          </div>
        );
    })}
  </div>

          <div className="cart-total">
            <h3>Total: Rs. {totalPrice}</h3>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;


