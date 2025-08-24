import React from 'react'
import { IMG_CDN, IMG_CDN_URL } from '../utils/constants'

const MovieCard = ({ posterPath }) => {
    if (!posterPath) {
        return null; // Handle case where posterPath is not available
    }
    return (
        <div className='w-36 md:w-48 pr-4'>

            <img alt="Movie Card" src={IMG_CDN_URL + posterPath} />
        </div>
    )
}

export default MovieCard
