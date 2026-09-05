import React, { useState, useEffect } from "react";
import ProductCard from "../Components/ProductCard";
import FilterBar from "../Components/FilterBar"; // Added import

import pistachio from "../Assets/pistachio-cake.jpg"
import ferrero from "../Assets/ferrero-rocher.jpg";
import chocolate from "../Assets/all-chocolate-dreamcake.jpg";
import belgian from "../Assets/belgian-malt.jpg";
import nutella from "../Assets/nutella.jpg";
import raffaello from "../Assets/raffaello.jpg";

const images = {
  "pistachio-cake.jpg": pistachio,
  "ferrero-rocher.jpg": ferrero,
  "all-chocolate-dreamcake.jpg": chocolate,
  "belgian-malt.jpg": belgian,
  "nutella.jpg": nutella,
  "raffaello.jpg": raffaello
};

const Cakes = () => {
  const [cakes, setCakes] = useState([]);
  const [search, setSearch] = useState(""); // New state
  const [sort, setSort] = useState("");     // New state

  useEffect(() => {
    // Pass search and sort states directly into the URL query
    fetch(`http://localhost:5000/api/products?category=cake&search=${search}&sort=${sort}`)
      .then((response) => response.json())
      .then((data) => {
        setCakes(data); // Backend already filtered it, just set the data
      })
      .catch((error) => console.log(error));
  }, [search, sort]); // Re-fetch whenever search or sort changes

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <p className="crave-section-subtitle">Decadent Slices</p>
        <h2 className="crave-section-title">Our Cakes</h2>
      </div>

      {/* Render FilterBar */}
      <FilterBar search={search} setSearch={setSearch} sort={sort} setSort={setSort} />

      <div className="row">
        {cakes.length > 0 ? (
          cakes.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              image={images[product.image]}
            />
          ))
        ) : (
          <div className="text-center text-muted mt-4">No cakes match your search.</div>
        )}
      </div>
    </div>
  );
};

export default Cakes;