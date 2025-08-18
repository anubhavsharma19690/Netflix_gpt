import React, { use, useEffect } from 'react'
import Header from './Header'
import { API_OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addNowPlayingMovies } from "../utils/moviesSlice"
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
const Browse = () => {
// - Fetch data from tmdb api and update the store
 useNowPlayingMovies()
  return (
    <div>
      <Header />
    </div>
  )
}

export default Browse
