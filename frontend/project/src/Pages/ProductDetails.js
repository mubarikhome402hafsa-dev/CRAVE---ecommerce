import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../Context/CartContext";

// --- IMAGE IMPORTS ---
import pistachio from "../Assets/pistachio-cake.jpg";
import ferrero from "../Assets/ferrero-rocher.jpg";
import chocolate from "../Assets/all-chocolate-dreamcake.jpg";
import belgian from "../Assets/belgian-malt.jpg";
import nutella from "../Assets/nutella.jpg";
import raffaello from "../Assets/raffaello.jpg";

import midnight from "../Assets/midnight-cookie.png";
import chocolateHazelnut from "../Assets/chocolate-hazelnut.png";
import doubleChocolate from "../Assets/double-chocolate.png";
import redVelvet from "../Assets/red-velvet.png";
import classicChocolate from "../Assets/classic-chocolatechip.png";
import kunafa from "../Assets/kunafa-cookie.png";

import strawberryWatermelon from "../Assets/strawberry-watermelon.jpg";
import mangoPineapple from "../Assets/mango-pineapple-refresher.jpg";
import kiwiApple from "../Assets/kiwi-apple-refresher.jpg";
import cookiesCream from "../Assets/cookies-n-cream-shake.jpg";
import lotus from "../Assets/lotus-shake.jpg";
import strawberry from "../Assets/strawberry-shake.jpg";

const images = {
  "pistachio-cake.jpg": pistachio,
  "ferrero-rocher.jpg": ferrero,
  "all-chocolate-dreamcake.jpg": chocolate,
  "belgian-malt.jpg": belgian,
  "nutella.jpg": nutella,
  "raffaello.jpg": raffaello,
  "midnight-cookie.png": midnight,
  "chocolate-hazelnut.png": chocolateHazelnut,
  "double-chocolate.png": doubleChocolate,
  "red-velvet.png": redVelvet,
  "classic-chocolatechip.png": classicChocolate,
  "kunafa-cookie.png": kunafa,
  "strawberry-watermelon.jpg": strawberryWatermelon,
  "mango-pineapple-refresher.jpg": mangoPineapple,
  "kiwi-apple-refresher.jpg": kiwiApple,
  "cookies-n-cream-shake.jpg": cookiesCream,
  "lotus-shake.jpg": lotus,
  "strawberry-shake.jpg": strawberry
};

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  
  const [product, setProduct] = useState(null);
  
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);


  const handleAddToCart = () => {
    addToCart(product);
    setShowAlert(true);
    
    
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  if (!product) {
    return <h2 className="text-center mt-5">Loading...</h2>;
  }

  return (
    <div className="container py-5 position-relative">
      
     
      {showAlert && (
        <div 
          className="toast align-items-center crave-toast show position-fixed top-0 end-0 p-2 m-4 shadow-lg" 
          role="alert" 
          style={{ zIndex: 1050, transition: 'all 0.3s ease' }}
        >
          <div className="d-flex">
            <div className="toast-body fw-bold">
              <i className="fas fa-check-circle me-2" style={{ color: '#B89B72' }}></i>
              {product.name} added to cart!
            </div>
            <button 
              type="button" 
              className="btn-close btn-close-white me-2 m-auto" 
              onClick={() => setShowAlert(false)}
            ></button>
          </div>
        </div>
      )}

      <div className="row align-items-center mt-4">
        {/* Left Column: Image Wrapper */}
        <div className="col-md-6 mb-4 mb-md-0">
          <div className="product-detail-image-wrapper shadow-sm">
            <img
              src={images[product.image]}
              alt={product.name}
              className="img-fluid product-detail-image"
            />
          </div>
        </div>

        {/* Right Column: Product Info */}
        <div className="col-md-6 ps-md-5 d-flex flex-column justify-content-center">
          <h1 className="product-detail-title">{product.name}</h1>
          
          <h3 className="product-detail-price mt-2">
            Rs. {product.price.toLocaleString()}.00
          </h3>
          
          <hr style={{ borderColor: '#E6DCCF', margin: '1.5rem 0' }} />
          
          <p className="product-detail-desc">{product.description}</p>
          
          <button
            className="crave-btn-large mt-4 w-75"
            onClick={handleAddToCart}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;