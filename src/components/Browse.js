import React, { use, useEffect } from 'react'
import Header from './Header'
import { API_OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addNowPlayingMovies } from "../utils/moviesSlice"
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import useUpComingMovies from '../hooks/useUpComingMovies';
const Browse = () => {
  // - Fetch data from tmdb api and update the store
  useNowPlayingMovies()
  usePopularMovies()
  useTopRatedMovies()
  useUpComingMovies()
  return (
    <div>
      <Header />
      <MainContainer />
      <div>
        <SecondaryContainer />
      </div>
      {/* 
      MainContainer 
        - videoBackground 
        - title
      Secondary/container
        - movieList
           -cards
      */}
    </div>
  )
}

export default Browse
