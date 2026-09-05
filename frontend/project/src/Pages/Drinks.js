import React, { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
import FilterBar from "../Components/FilterBar";

import cookiesCream from "../Assets/cookies-n-cream-shake.jpg";
import lotus from "../Assets/lotus-shake.jpg";
import strawberry from "../Assets/strawberry-shake.jpg";
import strawberryWatermelon from "../Assets/strawberry-watermelon.jpg";
import mangoPineapple from "../Assets/mango-pineapple-refresher.jpg";
import kiwiApple from "../Assets/kiwi-apple-refresher.jpg";

const images = {
  "cookies-n-cream-shake.jpg": cookiesCream,
  "lotus-shake.jpg": lotus,
  "strawberry-shake.jpg": strawberry,
  "strawberry-watermelon.jpg": strawberryWatermelon,
  "mango-pineapple-refresher.jpg": mangoPineapple,
  "kiwi-apple-refresher.jpg": kiwiApple
};

const Drinks = () => {
  const [drinks, setDrinks] = useState([]);
  const [search, setSearch] = useState(""); 
  const [sort, setSort] = useState("");     

  useEffect(() => {
    fetch(`http://localhost:5000/api/products?category=drink&search=${search}&sort=${sort}`)
      .then((response) => response.json())
      .then((data) => {
        setDrinks(data);
      })
      .catch((error) => console.log(error));
  }, [search, sort]);

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <p className="crave-section-subtitle">Sip & Savor</p>
        <h2 className="crave-section-title">Our Drinks</h2>
      </div>

      <FilterBar search={search} setSearch={setSearch} sort={sort} setSort={setSort} />

      <div className="row">
        {drinks.length > 0 ? (
          drinks.map((drink) => (
            <ProductCard
              key={drink._id}
              product={drink}
              image={images[drink.image]}
            />
          ))
        ) : (
           <div className="text-center text-muted mt-4">No drinks match your search.</div>
        )}
      </div>
    </div>
  );
};

export default Drinks;