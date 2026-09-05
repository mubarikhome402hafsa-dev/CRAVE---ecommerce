import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

// Cake images
import pistachio from "../Assets/pistachio-cake.jpg";
import ferrero from "../Assets/ferrero-rocher.jpg";
import chocolate from "../Assets/all-chocolate-dreamcake.jpg";
import belgian from "../Assets/belgian-malt.jpg";
import nutella from "../Assets/nutella.jpg";
import raffaello from "../Assets/raffaello.jpg";

// Cookie images
import midnight from "../Assets/midnight-cookie.png";
import chocolateHazelnut from "../Assets/chocolate-hazelnut.png";
import doubleChocolate from "../Assets/double-chocolate.png";
import redVelvet from "../Assets/red-velvet.png";
import classicChocolate from "../Assets/classic-chocolatechip.png";
import kunafa from "../Assets/kunafa-cookie.png";

// Drink images
import strawberryWatermelon from "../Assets/strawberry-watermelon.jpg";
import mangoPineapple from "../Assets/mango-pineapple-refresher.jpg";
import kiwiApple from "../Assets/kiwi-apple-refresher.jpg";
import cookiesCream from "../Assets/cookies-n-cream-shake.jpg";
import lotus from "../Assets/lotus-shake.jpg";
import strawberry from "../Assets/strawberry-shake.jpg";


const images = {

  // Cakes
  "pistachio-cake.jpg": pistachio,
  "ferrero-rocher.jpg": ferrero,
  "all-chocolate-dreamcake.jpg": chocolate,
  "belgian-malt.jpg": belgian,
  "nutella.jpg": nutella,
  "raffaello.jpg": raffaello,

  // Cookies
  "midnight-cookie.png": midnight,
  "chocolate-hazelnut.png": chocolateHazelnut,
  "double-chocolate.png": doubleChocolate,
  "red-velvet.png": redVelvet,
  "classic-chocolatechip.png": classicChocolate,
  "kunafa-cookie.png": kunafa,

  // Drinks
  "strawberry-watermelon.jpg": strawberryWatermelon,
  "mango-pineapple-refresher.jpg": mangoPineapple,
  "kiwi-apple-refresher.jpg": kiwiApple,
  "cookies-n-cream-shake.jpg": cookiesCream,
  "lotus-shake.jpg": lotus,
  "strawberry-shake.jpg": strawberry

};


const BestSellers = () => {

  const [products, setProducts] = useState([]);

  const [startIndex, setStartIndex] = useState(0);


  useEffect(() => {

    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => {

        const selectedProducts = [

  // 1
  data.find(
    (product) => product.name === "Lotus Shake"
  ),
  

  // 2
  data.find(
    (product) => product.name === "Ferrero Rocher Cake"
  ),

  // 3
  data.find(
    (product) => product.name === "Classic Chocolate Chip Cookie"
  ),

  // 4
  data.find(
    (product) => product.name === "Kunafa Cookie"
  ),

  // 5
  data.find(
    (product) => product.name === "Pistachio Cake"
  ),

  // 6
  data.find(
    (product) => product.name === "Strawberry Shake"
  ),

  // 7
  data.find(
    (product) => product.name === "Belgian Malt Cake"
  ),

  // 8
  data.find(
    (product) => product.name === "Red Velvet Cookie"
  )

].filter(Boolean);

        setProducts(selectedProducts);

      })
      .catch((error) => {
        console.log(error);
      });

  }, []);


  const nextSlide = () => {
  setStartIndex(1);
};

const previousSlide = () => {
  setStartIndex(0);
};


  return (

    <div className="container mt-5">

      <div className="text-center mb-5">
        <p className="crave-section-subtitle">Customer Favorites</p>
        <h2 className="crave-section-title">
          Our Popular Picks
        </h2>
      </div>


      <div className="position-relative">

        <div className="popular-carousel">
        <div className="popular-track"
          style={{
            transform: `translateX(-${startIndex * 50}%)`
          }}
        >

  {/* SLIDE 1 — PRODUCTS 1,2,3,4 */}

  <div className="popular-slide">

    <div className="row">

      {products.slice(0, 4).map((product) => (

        <ProductCard
          key={product._id}
          product={product}
          image={images[product.image]}
          columnClass="col-6 col-md-3"
          compact={true}
        />

      ))}

    </div>

  </div>


  {/* SLIDE 2 — PRODUCTS 5,6,7,8 */}

  <div className="popular-slide">

    <div className="row">

      {products.slice(4, 8).map((product) => (

        <ProductCard
          key={product._id}
          product={product}
          image={images[product.image]}
          columnClass="col-6 col-md-3"
          compact={true}
        />

      ))}

    </div>

  </div>

</div>

          

        </div>


        {/* LEFT ARROW */}

        {startIndex === 1 && (
          <button
            onClick={previousSlide}
            className="btn btn-dark position-absolute"
            style={{
              left: "-25px",
              top: "45%",
              zIndex: 10,
              borderRadius: "50%"
            }}
            >
            ←
          </button>
        )}

        {/* RIGHT ARROW */}

        {startIndex === 0 && (
          <button
            onClick={nextSlide}
            className="btn btn-dark position-absolute"
            style={{
              right: "-25px",
              top: "45%",
              zIndex: 10,
              borderRadius: "50%"
            }}
            >
            →
          </button>
        )}

      </div>

    </div>

  );

};

export default BestSellers;
