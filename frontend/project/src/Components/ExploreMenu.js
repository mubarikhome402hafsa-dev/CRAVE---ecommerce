import React from 'react';
import { Link } from 'react-router-dom';

// Import your category featured images
import cakeCategoryImg from '../Assets/cakeCategory.png';
import cookieCategoryImg from '../Assets/cookieCategory.jpg';
import drinkCategoryImg from '../Assets/drinkMenuu.jpg';

const ExploreMenu = () => {
  const categories = [
    {
      id: 1,
      title: 'Decadent Cakes',
      image: cakeCategoryImg,
      link: '/cakes',
    },
    {
      id: 2,
      title: 'Gooey Cookies',
      image: cookieCategoryImg,
      link: '/cookies',
    },
    {
      id: 3,
      title: 'Refreshing Drinks',
      image: drinkCategoryImg,
      link: '/drinks',
    },
  ];

  return (
    <section className="container my-5 py-4" id="menu">
      
      {/* SECTION HEADER */}
      <div className="text-center mb-5">
        <p className="crave-section-subtitle">Freshly Baked Daily</p>
        <h2 className="crave-section-title">Explore Our Menu</h2>
      </div>

      {/* CATEGORY CARDS GRID */}
      <div className="row g-4">
        {categories.map((cat) => (
          <div key={cat.id} className="col-12 col-md-4">
            <Link to={cat.link} className="card crave-category-card h-100 text-center p-3 text-decoration-none">
              
              <div className="crave-category-img-wrapper">
                <img 
                  src={cat.image} 
                  alt={cat.title} 
                  className="img-fluid crave-category-img" 
                />
              </div>

              <div className="card-body d-flex flex-column align-items-center justify-content-between pt-2">
                <h3 className="crave-category-title">{cat.title}</h3>
                <span className="crave-category-btn mt-2">
                  Explore Category
                </span>
              </div>

            </Link>
          </div>
        ))}
      </div>

    </section>
  );
};

export default ExploreMenu;
