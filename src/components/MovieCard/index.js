import React from 'react';

export const MovieCard = ({ moviedetails }) => {
  return (
    <div className="movie-card">
      <img src={moviedetails.posterUrl} alt={`${moviedetails.title} poster`} />
      <h2>{moviedetails.title}</h2>
      <p>Ratings: <span>{moviedetails.rating}</span></p>
      <p>Release Date: <span>{moviedetails.releaseDate}</span></p>
    </div>
  );
};
