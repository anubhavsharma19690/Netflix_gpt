import React from 'react'
import { IMG_CDN, IMG_CDN_URL } from '../utils/constants'

const MovieCard = ({ posterPath }) => {
    if (!posterPath) {
        return null; // Handle case where posterPath is not available
    }
    return (
        // <div className='w-36 md:w-48 pr-4'>

        //     <img alt="Movie Card" src={IMG_CDN_URL + posterPath} />
        // </div>
        <div className='w-36 md:w-48 pr-4 transition-all duration-300 ease-in-out transform hover:scale-110 hover:cursor-pointer'>
            <img
                alt="Movie Card"
                src={IMG_CDN_URL + posterPath}
                className="rounded-lg shadow-lg hover:shadow-2xl hover:shadow-red-500/25 transition-all duration-300 object-cover w-full h-full border-2 border-transparent hover:border-red-600"
                loading="lazy"
            />
        </div>
    )
}

export default MovieCard
