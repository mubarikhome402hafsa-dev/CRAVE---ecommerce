import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router-dom";

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

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/orders/myorders", {
          headers: {
            "Authorization": `Bearer ${user.token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) {
    return (
      <div className="container py-5 text-center mt-5" style={{ minHeight: "60vh" }}>
        <h3 className="fw-bold text-dark">Please log in to view your orders.</h3>
      </div>
    );
  }

  return (
    <div className="container py-5" style={{ minHeight: "80vh" }}>
      <div className="mb-5">
        <h2 className="fw-bold" style={{ color: "#2C1D11" }}>My Orders</h2>
        <p className="text-muted">View your order history and check delivery status.</p>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border" style={{ color: "#B89B72" }} role="status"></div>
        </div>
      ) : orders.length > 0 ? (
        <div className="row g-4">
          {orders.map((order) => (
            <div key={order._id} className="col-12">
              <div className="card border-0 shadow-sm">
                
                {/* Order Header */}
                <div className="card-header bg-light border-bottom-0 d-flex justify-content-between align-items-center p-3 flex-wrap gap-2">
                  <div>
                    <small className="text-muted d-block">ORDER ID</small>
                    <span className="fw-bold">{order._id.substring(order._id.length - 8).toUpperCase()}</span>
                  </div>
                  <div>
                    <small className="text-muted d-block">DATE PLACED</small>
                    <span className="fw-bold">{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <small className="text-muted d-block">TOTAL</small>
                    <span className="fw-bold">Rs. {order.totalPrice.toLocaleString()}.00</span>
                  </div>
                  <div>
                    <span className={`badge ${order.isDelivered ? 'bg-success' : 'bg-warning text-dark'} px-3 py-2 rounded-pill`}>
                      {order.isDelivered ? "Delivered" : "Processing"}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="card-body p-4">
                  {order.orderItems.map((item, index) => (
                    <div key={index} className="d-flex align-items-center mb-3">
                      <img 
                        src={images[item.image]} 
                        alt={item.name} 
                        className="rounded me-3 object-fit-cover shadow-sm" 
                        style={{ width: "60px", height: "60px" }}
                      />
                      <div className="flex-grow-1">
                        <h6 className="mb-0 fw-bold">{item.name}</h6>
                        <small className="text-muted">Qty: {item.quantity}</small>
                      </div>
                      <div className="fw-bold">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5 bg-light rounded">
          <h5 className="text-muted mb-3">You haven't placed any orders yet.</h5>
          <Link to="/" className="btn fw-bold px-4 py-2" style={{ backgroundColor: "#B89B72", color: "white" }}>
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyOrders;