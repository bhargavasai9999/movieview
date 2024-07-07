import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Home } from './components/Home';
import { SingleMovieDetailed } from './components/SingleMovie';
import { TopRated } from './components/TopRated';
import { UpcomingMovies } from './components/Upcoming';
import {Search} from './components/Search'; 
import { Notfound } from './components/NotFound';

const App = () => {
  return (
    <div className="App">

      <Routes>
      <Route path="/" element={<Navigate to="/popular" />} />

        <Route index path="/popular" element={<Home />} />
        <Route  path="/viewdetails/:id" element={<SingleMovieDetailed />} />
        <Route path="/toprated" element={<TopRated />} />
        <Route path="/upcoming" element={<UpcomingMovies />} />
        <Route path="/search" element={<SearchRouter />} />
        <Route path="*" element={<Notfound />} />

      </Routes>
    </div>
  );
};

const SearchRouter = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const query = searchParams.get('q');

  return query ? <Search /> : <Navigate to="/home" replace />;
};

export default App;
