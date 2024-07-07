import React, { useState, useEffect } from 'react';
import { api, apikey } from '../../apis/axiosConfig';
import { UpcomingCard } from '../UpcomingCard';
import { Loader } from '../Loader'; 
import './index.css';
import { IoArrowForward, IoArrowBackSharp } from "react-icons/io5";
import { Navbar } from '../Navbar';
import { Link } from 'react-router-dom';

export const UpcomingMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUpcomingMovies = async (page) => {
    setLoading(true);
    try {
      const response = await api.get(`/movie/upcoming?api_key=${apikey}&language=en-US&page=${page}`);
      setMovies(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error('Error fetching upcoming movies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpcomingMovies(pageNumber);
  }, [pageNumber]);

  const handlePrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleNextPage = () => {
    if (pageNumber < totalPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  return (
    <div>
      <Navbar />
      <h1 className="p-3">Upcoming Movies</h1>
      {loading ? (
        <Loader /> 
      ) : (
        <div>
          <div className="movies-grid">
            {movies.map((movie) => (
            <Link to={`/viewdetails/${movie.id}`} className="link-no-underline">
            <UpcomingCard key={movie.id} movie={movie} />
            </Link>
            ))}
          </div>
          <div className="pagination">
            <button onClick={handlePrevPage} disabled={pageNumber === 1}>
              <IoArrowBackSharp />
            </button>
            <button className='bg-dark'>
              {pageNumber}
            </button>
            <button onClick={handleNextPage} disabled={pageNumber === totalPages}>
              <IoArrowForward />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

