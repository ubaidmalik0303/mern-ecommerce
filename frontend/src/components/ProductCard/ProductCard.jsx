import React from "react";
import { NavLink } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const options = {
    edit: false,
    color: "rgba(20, 20, 20, 0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };

  return (
    <>
      <NavLink className="productCard" to={`/product/${product._id}`}>
        <img src="https://cdn.shopify.com/s/files/1/0306/1124/3143/products/08-1-Front_1024x.jpg" alt={product.name} />
        <p>{product.name}</p>
        <div>
          <ReactStars {...options} /> <span>({product.numOfReviews} Reviews)</span>
        </div>
        <span>{`PKR ${product.price}`}</span>
      </NavLink>
    </>
  );
};

export default ProductCard;
