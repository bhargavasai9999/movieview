import React from 'react';
export const TopRatedCard = ({ moviedetails }) => {
  return (
    <div className="movie-card">

      <img src={moviedetails.poster_path} alt={`${moviedetails.title} poster`} />
      <h2>{moviedetails.title}</h2>
      <p>Ratings: <span>{moviedetails.vote_average}</span></p>
      <p>Release Date: <span>{moviedetails.release_date}</span></p>
    </div>
  );
};
