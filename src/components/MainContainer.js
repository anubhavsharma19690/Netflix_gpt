import React from 'react'
import { useSelector } from 'react-redux'
import VideoTitle from './VideoTitle'
import VideoBackgound from './VideoBackgound'

const MainContainer = () => {
    const movies = useSelector((store) => store.movies?.nowPlayingMovies)



    // Return early if no movies are available
    if (!movies || movies.length === 0) {
        return null; // or return a loading spinner/placeholder
    }

    const mainMovie = movies[0]


    const { original_title, overview, id } = mainMovie;




    return (
        <div>
            <VideoTitle title={original_title} overview={overview} />
            <VideoBackgound movieId={id} />
        </div>
    )
}

export default MainContainer
