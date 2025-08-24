import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({ title, movies }) => {


    return (
        <div className='px-6 '>
            <h1 className='text-lg md:text-2xl py-4 text-white'>{title}</h1>
            {/* <div className='flex overflow-x-hidden hover:overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900'> */}

            <div className='flex overflow-x-auto hide-scrollbar'>
                <div className='flex '>
                    {movies?.map((movie) =>
                        <MovieCard key={movie?.id} posterPath={movie.poster_path} />
                    )}

                </div>
            </div>


        </div>
    )
}

export default MovieList
