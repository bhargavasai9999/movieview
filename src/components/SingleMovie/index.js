import React, { useEffect, useState } from 'react';
import { api, apikey } from '../../apis/axiosConfig';
import { Loader } from '../Loader';
import './index.css';
import { useParams } from 'react-router-dom';

export const SingleMovieDetailed = () => {
  const { id } = useParams();

  const [movieDetails, setMovieDetails] = useState(null);
  const [castDetails, setCastDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/movie/${id}?api_key=${apikey}&language=en-US`);
        setMovieDetails(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCastDetails = async () => {
      try {
        const response = await api.get(`/movie/${id}/credits?api_key=${apikey}&language=en-US`);
        setCastDetails(response.data.cast);
      } catch (error) {
        console.error('Error fetching cast details:', error);
      }
    };

    fetchMovieDetails();
    fetchCastDetails();
  }, [id]);

  return (
    <div className="single-movie-details">
      {loading ? (
        <Loader />
      ) : (
        <>
          {movieDetails && (
            <div className="movie-details">
              <div className="movie-info">
                <h2 className="movie-title">{movieDetails.title}</h2>
                <p className="tagline">{movieDetails.tagline}</p>
                <div className="overview-section">
                  <h3>Overview</h3>
                  <p className="overview-text">{movieDetails.overview}</p>
                </div>
                <div className="details-section d-flex flex-row w-100">
                  <div>
                    <h3>Genres</h3>
                    <ul className="genres-list">
                      {movieDetails.genres.map((genre) => (
                        <li key={genre.id}>{genre.name}</li>
                      ))}
                    </ul>
                  </div>
                  <div className='px-3'>
                    <h3> Companies</h3>
                    <ul className="production-companies-list ">
                      {movieDetails.production_companies.map((company) => (
                        <li key={company.id}>{' '}{company.name}</li>
                      ))}
                    </ul>
                  </div>
                  <div className='d-flex flex-row justify-content-between'>
                                      <div  className='p-2'>
                    <h3>Runtime</h3>
                    <p >{movieDetails.runtime} minutes</p>
                  </div>
                  <div className='p-2'>
                    <h3>Release Date</h3>
                    <p className='fw-bold'>{movieDetails.release_date}</p>
                  </div>
                  
                  <div className='p-2'>
                    <h3>Website</h3>
                    <p><a href={movieDetails.homepage} target="_blank" rel="noopener noreferrer">{movieDetails.homepage}</a></p>
                  </div>
                </div>
                </div>
              </div>
              <img src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`} alt={movieDetails.title} className="movie-poster" />
            </div>
          )}
          <div className="cast-details">
            <h3 className="cast-title">Cast:</h3>
            <ul className="cast-list">
              {castDetails.map((cast) => (
                <li key={cast.id} className="cast-item">
                  <img src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`} alt={cast.name} className="actor-image" />
                  <div className="cast-info">
                    <h4 className="actor-name">{cast.name}</h4>
                    <p className="actor-character">Character: {cast.character}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};
