import React, { useState, useEffect } from 'react';
import { api, apikey } from '../../apis/axiosConfig';
import { Loader } from '../Loader/index';
import { TopRatedCard } from '../TopRatedCard'; // Adjust path based on your file structure
import './index.css';
import { IoArrowForward, IoArrowBackSharp } from "react-icons/io5";
import { Navbar } from '../Navbar';
import { Link } from 'react-router-dom';
export const TopRated = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTopRatedDetails = async (page) => {
    setLoading(true);
    try {
      const response = await api.get(`/movie/top_rated?api_key=${apikey}&language=en-US&page=${page}`);
      setMovies(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error('Error fetching top-rated movie details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopRatedDetails(pageNumber);
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
        <Navbar/>
      <h1 className="p-3">Top Rated Movies</h1>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="movies-grid">
            {movies.map((movie) => (
            <Link to={`/viewdetails/${movie.id}`} className="link-no-underline">

              <TopRatedCard
                key={movie.id}
                moviedetails={{
                  title: movie.title,
                  poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                  vote_average: movie.vote_average,
                  release_date: movie.release_date,
                  overview: movie.overview,
                }}
              />
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

