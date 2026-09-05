import React from 'react';

const FilterBar = ({ search, setSearch, sort, setSort }) => {
  return (
    <div className="container my-4">
      <div className="row g-3 align-items-center bg-light p-3 rounded shadow-sm">
        
        {/* Search Input */}
        <div className="col-12 col-md-8">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0">
              <i className="fas fa-search" style={{ color: '#B89B72' }} />
            </span>
            <input
              type="text"
              className="form-control border-start-0 ps-0 shadow-none"
              placeholder="Search desserts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Sort Selector */}
        <div className="col-12 col-md-4">
          <select
            className="form-select shadow-none"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            style={{ borderColor: '#e0e0e0', cursor: 'pointer' }}
          >
            <option value="">Sort By: Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
          </select>
        </div>

      </div>
    </div>
  );
};

export default FilterBar;