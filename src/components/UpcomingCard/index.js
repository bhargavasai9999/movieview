import React from 'react';

export const UpcomingCard = ({ movie}) => {
  return (
    <div className="movie-card">
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`${movie.title} poster`} />
      <h2>{movie.title}</h2>
      <p>Ratings: <span>{movie.vote_average}</span></p>
      <p>Release Date: <span>{movie.release_date}</span></p>
      <p>Popularity: <span>{movie.popularity}</span></p>
    </div>
  );
};

