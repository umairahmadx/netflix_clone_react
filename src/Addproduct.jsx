import React, { useState } from "react";
import "./Addproduct.css";

const Addproduct = () => {
  const [formdata, setFormdata] = useState({
    category: "",
    title: "",
    weight: "",
    price: "",   
    img: ""
  });

  const addproduct = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:7000/products", {
        method: "POST",
        headers: {                      
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formdata)
      });

      const result = await response.json();

      if (!response.ok) {
        alert("Failed to add product ❌");
        console.log(result);
        return;
      }

      alert("Product added successfully ✔");
      console.log(result);

      // Reset form
      setFormdata({
        category: "",
        title: "",
        weight: "",
        price: "",
        img: ""
      });

    } catch (error) {
      console.error("Error adding product:", error);
      alert("❌ Something went wrong");
    }
  };

  return (
    <div className="addproduct-container">
      <div className="addproduct-box">
        <h1>Add Product</h1>

        <form onSubmit={addproduct}>
          <input
            type="text"
            placeholder="Category Name"
            className="addproduct-input"
            value={formdata.category}
            onChange={(e) =>
              setFormdata({ ...formdata, category: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Product Title"
            className="addproduct-input"
            value={formdata.title}
            onChange={(e) =>
              setFormdata({ ...formdata, title: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Product Weight"
            className="addproduct-input"
            value={formdata.weight}
            onChange={(e) =>
              setFormdata({ ...formdata, weight: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Price"
            className="addproduct-input"
            value={formdata.price}
            onChange={(e) =>
              setFormdata({ ...formdata, price: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Image URL"
            className="addproduct-input"
            value={formdata.img}
            onChange={(e) =>
              setFormdata({ ...formdata, img: e.target.value })
            }
          />

          <button type="submit" className="add-btn">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;


