import React, { use, useEffect } from 'react'
import Header from './Header'
import { API_OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addNowPlayingMovies } from "../utils/moviesSlice"
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
const Browse = () => {
  // - Fetch data from tmdb api and update the store
  useNowPlayingMovies()
  return (
    <div>
      <Header />
      <MainContainer />
      <SecondaryContainer />
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
