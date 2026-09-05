import React from 'react';
import { Link } from "react-router-dom";

import cakeImage from '../Assets/cake2ndHero.png';
import cookieImg from '../Assets/cookie2ndHero.png';
import drinkImg from '../Assets/drink2ndHero.png';

const HeroSection = () => {
  return (
    <div
      id="carouselExampleAutoplaying"
      className="carousel slide"
      data-bs-ride="carousel"
    >

      <div className="carousel-inner">

        {/* COOKIES */}
        <div className="carousel-item active">

          <img
            src={cookieImg}
            className="d-block w-100"
            alt="Cookies"
          />

          <div className="hero-content">
            <h2>A little cookie happiness</h2>

            <p>
              Soft, gooey and packed with delicious chocolatey goodness.
            </p>

            <Link
              to="/cookies"
              className="btn btn-dark hero-btn"
            >
              Explore Cookies
            </Link>
          </div>

        </div>


        {/* CAKES */}
        <div className="carousel-item">

          <img
            src={cakeImage}
            className="d-block w-100"
            alt="Cakes"
          />

          <div className="hero-content">
            <h2>A little slice of happiness</h2>

            <p>
              Delicious cakes baked to make every moment sweeter.
            </p>

            <Link
              to="/cakes"
              className="btn btn-dark hero-btn"
            >
              Explore Cakes
            </Link>
          </div>

        </div>


        {/* DRINKS */}
        <div className="carousel-item">

          <img
            src={drinkImg}
            className="d-block w-100"
            alt="Drinks"
          />

          <div className="hero-content">
            <h2>Something refreshing</h2>

            <p>
              Cool, creamy and made for every sweet craving.
            </p>

            <Link
              to="/drinks"
              className="btn btn-dark hero-btn"
            >
              Explore Drinks
            </Link>
          </div>

        </div>

      </div>


      {/* PREVIOUS */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon"></span>
        <span className="visually-hidden">Previous</span>
      </button>


      {/* NEXT */}
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon"></span>
        <span className="visually-hidden">Next</span>
      </button>

    </div>
  );
};

export default HeroSection;
