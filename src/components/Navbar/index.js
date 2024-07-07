import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './index.css';

export const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <div className='background'>
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand text-light" to="/popular">MOVIE VIEW</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto  mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active text-light" to="/popular">Popular</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/toprated">Top-Rated</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/upcoming">Upcoming</Link>
              </li>
            </ul>
            <form className="d-flex flex-row" onSubmit={handleSearchSubmit}>
              <input
                className="form-control me-2 h-50 mt-4"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-outline-light" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};
