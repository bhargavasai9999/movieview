import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api, apikey } from '../../apis/axiosConfig';
import './index.css'; 

import { Navbar } from '../Navbar/index';
import { MovieCard } from '../MovieCard/index';
import { Loader } from '../Loader/index';
import { IoArrowForward, IoArrowBackSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';

export const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [pageNumber, setPageNumber] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearch = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/search/movie?api_key=${apikey}&language=en-US&query=${query}&page=${pageNumber}`);
        setSearchResults(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearch();
  }, [query, pageNumber]);

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
      <h1 className='p-3'>Search Results for "{query}"</h1>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="movies-grid">
            {searchResults.map(movie => (
              <Link to={`/viewdetails/${movie.id}`} key={movie.id} className="link-no-underline">
                <MovieCard
                  moviedetails={{
                    title: movie.title,
                    posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                    rating: movie.vote_average,
                    releaseDate: movie.release_date,
                    overview: movie.overview
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
        </>
      )}
    </div>
  );
};
