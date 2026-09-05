import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const ProductCard = ({
  product,
  image,
  columnClass = "col-lg-4 col-md-6 mb-4",
  compact = false
}) => {
  const { user, setUser } = useContext(AuthContext); // Access user and updater
  const [isWished, setIsWished] = useState(false);

  // Check wishlist state across strings and objects
  useEffect(() => {
    if (user && user.wishlist && Array.isArray(user.wishlist)) {
      const exists = user.wishlist.some((item) => {
        const id = typeof item === "object" ? item._id : item;
        return id?.toString() === product._id?.toString();
      });
      setIsWished(exists);
    } else {
      setIsWished(false);
    }
  }, [user, product._id]);

  const handleWishlistToggle = async () => {
    if (!user) {
      alert("Please log in to add items to your wishlist!");
      return;
    }

    // Optimistic UI toggle
    const nextState = !isWished;
    setIsWished(nextState);

    try {
      const response = await fetch("http://localhost:5000/api/users/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
        body: JSON.stringify({ productId: product._id })
      });

      if (response.ok) {
        const updatedWishlist = await response.json();

        // Update global AuthContext and localStorage state
        const updatedUser = { ...user, wishlist: updatedWishlist };
        if (setUser) setUser(updatedUser);
        localStorage.setItem("crave_user", JSON.stringify(updatedUser));
      } else {
        // Revert on failure
        setIsWished(!nextState);
        console.error("Failed to update wishlist");
      }
    } catch (error) {
      setIsWished(!nextState);
      console.error("Error toggling wishlist", error);
    }
  };

  return (
    <div className={columnClass}>
      <div className={`product-card ${compact ? "compact-card" : ""}`}>
        
        {/* Image Section */}
        <div className="product-image-container">
          <img
            src={image}
            alt={product.name}
            className="product-image"
          />
          <button 
            className="heart-btn" 
            onClick={handleWishlistToggle}
            style={{ 
              color: isWished ? "#ff4d4d" : "inherit",
              border: "none", 
              background: "transparent",
              fontSize: "1.5rem",
              cursor: "pointer"
            }}
          >
            {isWished ? "♥" : "♡"}
          </button>
        </div>

        {/* Product Information */}
        <div className="product-info">
          <h3>{product.name}</h3>

          <p className={compact ? "compact-description" : ""}>
            {product.description}
          </p>

          <h4>Rs. {product.price.toLocaleString()}.00</h4>

          <Link to={`/product/${product._id}`} className="add-cart-btn">
            Add To Cart
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ProductCard;