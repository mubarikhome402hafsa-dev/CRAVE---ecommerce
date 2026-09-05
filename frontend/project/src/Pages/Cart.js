import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
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

const Cart = () => {

    const navigate = useNavigate();

  const { 
    cartItems, 
    removeFromCart, 
    increaseQuantity, 
    decreaseQuantity, 
    total 
  } = useContext(CartContext);

  // Calculations for the footer
  const tax = total * 0.18; // 18% Tax
  const grandTotal = total + tax;

  return (
    <div 
      className="offcanvas offcanvas-end shadow" 
      tabIndex="-1" 
      id="cartOffcanvas" 
      aria-labelledby="cartOffcanvasLabel"
      style={{ width: '400px' }}
    >
      
      {/* Drawer Header */}
      <div className="offcanvas-header border-bottom">
        <h4 className="offcanvas-title fw-bold" id="cartOffcanvasLabel">Your Cart</h4>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>

      {/* Drawer Body (Scrollable Items) */}
      <div className="offcanvas-body p-0">
        
        {cartItems.length === 0 ? (
          <div className="text-center mt-5 pt-5 text-muted">
            <h5 className="fw-light">Your cart is empty</h5>
          </div>
        ) : (
          <div className="p-3">
            {cartItems.map((item) => (
              <div key={item._id} className="d-flex mb-4 pb-3 border-bottom">
                
                {/* Image */}
                <img 
                  src={images[item.image]} 
                  alt={item.name} 
                  className="rounded object-fit-cover me-3" 
                  style={{ width: '80px', height: '80px' }}
                />
                
                {/* Details */}
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-start mb-1">
                    <h6 className="fw-bold mb-0">{item.name}</h6>
                  </div>
                  
                  <p className="text-muted small mb-2 text-truncate" style={{ maxWidth: '200px' }}>
                    {item.description}
                  </p>
                  
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    {/* Quantity Controls */}
                    <div className="d-flex align-items-center border rounded">
                      <button className="btn btn-sm px-2 py-0" onClick={() => decreaseQuantity(item._id)}>−</button>
                      <span className="px-2 small fw-bold">{item.quantity}</span>
                      <button className="btn btn-sm px-2 py-0" onClick={() => increaseQuantity(item._id)}>+</button>
                    </div>

                    {/* Price & Trash */}
                    <div className="text-end">
                      <p className="fw-bold mb-1 small">Rs. {(item.price * item.quantity).toLocaleString()}.00</p>
                      <button className="btn btn-link text-muted p-0 ms-2" onClick={() => removeFromCart(item._id)}>
                         <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* Drawer Footer (Sticky Totals) */}
      {cartItems.length > 0 && (
        <div className="offcanvas-footer p-3 border-top bg-white">
          <div className="d-flex justify-content-between mb-2 small text-muted">
            <span>Subtotal</span>
            <span>Rs. {total.toLocaleString()}.00</span>
          </div>
          <div className="d-flex justify-content-between mb-2 small text-muted">
            <span>Incl. Tax (18%)</span>
            <span>Rs. {tax.toLocaleString()}.00</span>
          </div>
          <div className="d-flex justify-content-between mb-3 small text-muted">
            <span>Delivery Charges</span>
            <span>Rs. 0.00</span>
          </div>
          
          <div className="d-flex justify-content-between mb-3 fw-bold fs-5">
            <span>Grand total</span>
            <span>Rs. {grandTotal.toLocaleString()}.00</span>
          </div>
          
          <button 
            className="btn w-100 fw-bold py-2" 
            style={{ backgroundColor: '#B89B72', color: 'white' }}
            data-bs-dismiss="offcanvas"
            onClick={() => navigate('/checkout')}
          >
            Checkout
          </button>
        </div>
      )}

    </div>
  );
};

export default Cart;