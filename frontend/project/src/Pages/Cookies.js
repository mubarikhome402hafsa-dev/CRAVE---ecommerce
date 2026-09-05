import React, { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
import FilterBar from "../Components/FilterBar";

import midnight from "../Assets/midnight-cookie.png";
import chocolateHazelnut from "../Assets/chocolate-hazelnut.png";
import doubleChocolate from "../Assets/double-chocolate.png";
import redVelvet from "../Assets/red-velvet.png";
import classicChocolate from "../Assets/classic-chocolatechip.png";
import kunafa from "../Assets/kunafa-cookie.png";

const images = {
  "midnight-cookie.png": midnight,
  "chocolate-hazelnut.png": chocolateHazelnut,
  "double-chocolate.png": doubleChocolate,
  "red-velvet.png": redVelvet,
  "classic-chocolatechip.png": classicChocolate,
  "kunafa-cookie.png": kunafa
};

const Cookies = () => {
  const [cookies, setCookies] = useState([]);
  const [search, setSearch] = useState(""); 
  const [sort, setSort] = useState("");     

  useEffect(() => {
    fetch(`http://localhost:5000/api/products?category=cookie&search=${search}&sort=${sort}`)
      .then((response) => response.json())
      .then((data) => {
        setCookies(data);
      })
      .catch((error) => console.log(error));
  }, [search, sort]);

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <p className="crave-section-subtitle">Baked to Perfection</p>
        <h2 className="crave-section-title">Our Cookies</h2>
      </div>

      <FilterBar search={search} setSearch={setSearch} sort={sort} setSort={setSort} />

      <div className="row">
        {cookies.length > 0 ? (
          cookies.map((cookie) => (
            <ProductCard
              key={cookie._id}
              product={cookie}
              image={images[cookie.image]}
            />
          ))
        ) : (
           <div className="text-center text-muted mt-4">No cookies match your search.</div>
        )}
      </div>
    </div>
  );
};

export default Cookies;