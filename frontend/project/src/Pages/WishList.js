import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import ProductCard from "../Components/ProductCard";

// Import all category images
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
import cookiesCream from "../Assets/cookies-n-cream-shake.jpg";
import lotus from "../Assets/lotus-shake.jpg";
import strawberry from "../Assets/strawberry-shake.jpg";
import strawberryWatermelon from "../Assets/strawberry-watermelon.jpg";
import mangoPineapple from "../Assets/mango-pineapple-refresher.jpg";
import kiwiApple from "../Assets/kiwi-apple-refresher.jpg";

const allImages = {
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
  "cookies-n-cream-shake.jpg": cookiesCream,
  "lotus-shake.jpg": lotus,
  "strawberry-shake.jpg": strawberry,
  "strawberry-watermelon.jpg": strawberryWatermelon,
  "mango-pineapple-refresher.jpg": mangoPineapple,
  "kiwi-apple-refresher.jpg": kiwiApple
};

const WishList = () => {
  const { user } = useContext(AuthContext);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/users/wishlist", {
          headers: {
            "Authorization": `Bearer ${user.token}` // Send VIP token
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setWishlistProducts(data);
        }
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [user]);

  if (!user) {
    return (
      <div className="container py-5 text-center" style={{ minHeight: '60vh' }}>
        <h3 className="fw-bold" style={{ color: '#2C1D11' }}>Please log in to view your wishlist.</h3>
      </div>
    );
  }

  return (
    <div className="container py-5" style={{ minHeight: '80vh' }}>
      <div className="text-center mb-5">
        <p className="crave-section-subtitle">Your Favorites</p>
        <h2 className="crave-section-title">My Wishlist</h2>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border" style={{ color: '#B89B72' }} role="status"></div>
        </div>
      ) : wishlistProducts.length > 0 ? (
        <div className="row g-4">
          {wishlistProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              image={allImages[product.image]}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-5 text-muted">
          Your wishlist is currently empty. Start adding some treats!
        </div>
      )}
    </div>
  );
};

export default WishList;