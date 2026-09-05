import React from "react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="container py-5 text-center d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
      
      <i className="fas fa-check-circle text-success mb-4" style={{ fontSize: "5rem" }}></i>
      
      <h1 className="fw-bold mb-3">Order Placed Successfully!</h1>
      <p className="text-muted mb-5">Thank you for your order. We are preparing it now.</p>
      
      <Link 
        to="/" 
        className="btn px-5 py-3 fw-bold" 
        style={{ backgroundColor: '#B89B72', color: 'white' }}
      >
        Continue Shopping
      </Link>

    </div>
  );
};

export default OrderSuccess;