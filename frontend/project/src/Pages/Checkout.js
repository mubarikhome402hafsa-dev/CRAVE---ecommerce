import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { AuthContext } from "../Context/AuthContext";

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

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const { cartItems, total, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  
  
  // Setting default city for faster testing
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "Lahore", 
    instructions: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePlaceOrder = async (e) => {
  e.preventDefault();

  if (!user) {
    alert("Please log in to place an order.");
    return;
  }

  // Format cart items for the backend schema
  const orderItems = cartItems.map(item => ({
    name: item.name,
    quantity: item.quantity,
    image: item.image,
    price: item.price,
    product: item._id
  }));

  try {
    const res = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
      },
      body: JSON.stringify({
        orderItems,
        shippingAddress: formData,
        paymentMethod: "Cash On Delivery",
        itemsPrice: total,
        taxPrice: tax,
        totalPrice: grandTotal
      })
    });

    if (res.ok) {
      clearCart();           
      navigate('/success');  
    } else {
      const errorData = await res.json();
      alert(errorData.message || "Failed to place order.");
    }
  } catch (error) {
    console.error("Order Error:", error);
    alert("Something went wrong during checkout.");
  }
};

  const tax = total * 0.18;
  const grandTotal = total + tax;

  // If someone tries to access checkout with an empty cart, send them back
  if (cartItems.length === 0) {
    return (
      <div className="container py-5 text-center mt-5">
        <h2>Your cart is empty.</h2>
        <Link to="/" className="btn btn-dark mt-3">Return to Shop</Link>
      </div>
    );
  }

  return (
    <div className="container py-5 bg-light" style={{ minHeight: "100vh" }}>
      <form onSubmit={handlePlaceOrder} className="row g-4">
        
        {/* LEFT SIDE: Forms */}
        <div className="col-lg-7">
          
          {/* Customer Details Card */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-4">
              <h5 className="mb-4 fw-bold">Customer Details</h5>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label text-muted small">Full Name</label>
                  <input type="text" className="form-control" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-muted small">Phone Number</label>
                  <input type="tel" className="form-control" name="phone" value={formData.phone} onChange={handleInputChange} required />
                </div>
                <div className="col-12">
                  <label className="form-label text-muted small">Delivery Address</label>
                  <input type="text" className="form-control" name="address" value={formData.address} onChange={handleInputChange} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-muted small">City</label>
                  <input type="text" className="form-control" name="city" value={formData.city} onChange={handleInputChange} required />
                </div>
              </div>
            </div>
          </div>

          {/* Special Instructions Card */}
          <div className="card border-0 shadow-sm mb-4 bg-white">
            <div className="card-body p-4">
              <h5 className="mb-3 fw-bold">Special Instructions (Optional)</h5>
              <textarea 
                className="form-control bg-light border-0" 
                rows="3" 
                name="instructions"
                placeholder="Add any comment, e.g. about allergies, or delivery instructions here."
                value={formData.instructions}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>

          {/* Payment Method Card */}
          <div className="card border-0 shadow-sm bg-white">
            <div className="card-body p-4">
              <h5 className="mb-3 fw-bold">Select Payment Method</h5>
              <div className="border rounded p-3 d-inline-block border-warning bg-light" style={{ cursor: "pointer" }}>
                <i className="fas fa-money-bill-wave text-success me-2"></i>
                <strong>Cash On Delivery</strong>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT SIDE: Order Summary */}
        <div className="col-lg-5">
          <div className="card border-0 shadow-sm sticky-top" style={{ top: "20px" }}>
            <div className="card-body p-4">
              <h5 className="mb-4 fw-bold">Order Summary</h5>
              
              {/* Mini Cart Items */}
              <div className="mb-4" style={{ maxHeight: "300px", overflowY: "auto" }}>
                {cartItems.map((item) => (
                  <div key={item._id} className="d-flex align-items-center mb-3">
                    <img 
                      src={images[item.image]} 
                      alt={item.name} 
                      className="rounded me-3 object-fit-cover" 
                      style={{ width: "50px", height: "50px" }}
                    />
                    <div className="flex-grow-1">
                      <h6 className="mb-0 small fw-bold">{item.name}</h6>
                      <small className="text-muted">Qty: {item.quantity}</small>
                    </div>
                    <div className="fw-bold small">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Add more items link */}
              <div className="text-center mb-4">
                 <Link to="/" className="text-decoration-none text-dark small fw-bold border-bottom border-dark pb-1">+ Add more items</Link>
              </div>

              <hr className="text-muted" />

              {/* Totals */}
              <div className="d-flex justify-content-between mb-2 small">
                <span className="text-muted">Subtotal</span>
                <span>Rs. {total.toLocaleString()}.00</span>
              </div>
              <div className="d-flex justify-content-between mb-2 small">
                <span className="text-muted">Incl. Tax (18%)</span>
                <span>Rs. {tax.toLocaleString()}.00</span>
              </div>
              <div className="d-flex justify-content-between mb-4 small">
                <span className="text-muted">Delivery Charges</span>
                <span>Rs. 0.00</span>
              </div>
              
              <div className="d-flex justify-content-between mb-4 fw-bold fs-5">
                <span>Grand total</span>
                <span>Rs. {grandTotal.toLocaleString()}.00</span>
              </div>
              
              <button 
                type="submit" 
                className="btn w-100 fw-bold py-3" 
                style={{ backgroundColor: '#B89B72', color: 'white' }}
              >
                Place Order
              </button>

            </div>
          </div>
        </div>

      </form>
    </div>
  );
};

export default Checkout;