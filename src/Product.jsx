import React from 'react'
import "./Product.css";


  const Product = ({ title, weight, price, img, cartCount, setCartCount, favCount,setFavCount, cartItems,setCartItems, favItems, setFavItems}) => {
  
    
   return (
  
    <div className="product">
      <img src={img} alt={title} />

      
      <div className="product-content">
      
        <h3 className="product-title">{title}</h3>
        <h4 className="product-weight">{weight}</h4>
        <span className="product-amount">Rs. {price}</span>

        <div className="product-buttons">

  {/* ADD TO FAVOURITE */}
  <button
    className="product-favourite"
    onClick={() => {
      const newCount = favCount + 1;
      setFavCount(newCount);

      // ----- save item in fav list -----
      const newFavItems = [...favItems, { img, title, weight, price }];
      setFavItems(newFavItems);

      // ----- save to localStorage ------
      localStorage.setItem("favCount", newCount);
      localStorage.setItem("favItems", JSON.stringify(newFavItems));
    }}
  >
    Add to Favourite
  </button>

  {/* ADD TO CART */}
  <button
  className="product-cart"
  onClick={() => {
    const existingItem = cartItems.find(
      (item) => item.title === title
    );

    let updatedCart;

    if (existingItem) {
      // increase quantity
      updatedCart = cartItems.map((item) =>
        item.title === title
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      // add new product
      updatedCart = [
        ...cartItems,
        { img, title, weight, price, quantity: 1 }
      ];
    }

    setCartItems(updatedCart);
    setCartCount(updatedCart.reduce((sum, i) => sum + i.quantity, 0));

    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    localStorage.setItem(
      "cartCount",
      updatedCart.reduce((sum, i) => sum + i.quantity, 0)
    );
  }}
>
  Add to Cart
</button>


</div>

        </div>
      </div>
    );
};

export default Product;
