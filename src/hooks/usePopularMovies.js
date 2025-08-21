import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addPopularMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

const usePopularMovies = () => {
    // - Fetch data from tmdb api and update the store
    const dispatch = useDispatch()
    const popularMovies = useSelector((store) => store.movies.popularMovies);
    const gePopularMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/popular?&page=1', API_OPTIONS)
        const json = await data.json();
        dispatch(addPopularMovies(json.results))

    }

    useEffect(() => {
        if (!popularMovies)
            gePopularMovies()
    }, [])
}

export default usePopularMovies