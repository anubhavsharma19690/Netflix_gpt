import React, { useEffect, useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addgptMovieResult } from "../utils/gptSlice";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
    analyzeSentiment,
    generateContent,
    getEmbedding,
    queryHF,
} from "./huggingfaceAPI";

const GptSearchBar = () => {
    const dispatch = useDispatch();
    const langKey = useSelector((store) => store.config.lang);
    const searchText = useRef(null);

    const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
    console.log("selectedLangugae", langKey);

    // Search movie in tmdb
    const searchMovieTmdb = async (movie) => {
        const data = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
            API_OPTIONS
        );

        const json = await data.json();
        return json.results;
    };

    const handleGptSearchClick = async () => {
        const geminiresults = await generateContent(searchText.current.value);
        const movieList = geminiresults.split(",").map((item) => item.trim());

        // For Each movie I will call search  TMDB Api and get the movie details
        const promiseArray = movieList?.map((movie) => searchMovieTmdb(movie));
        const tmdbResults = await Promise.all(promiseArray);

        dispatch(
            addgptMovieResult({ movieNames: movieList, movieResults: tmdbResults })
        );
    };

    return (


        <div className="pt-[35%] md:pt-[10%] flex justify-center">
            <form
                className="w-full md:w-1/2 bg-black/80 grid grid-cols-12 p-6 rounded-lg backdrop-blur-sm shadow-2xl border border-gray-800 hover:shadow-red-500/20 transition-all duration-300"
                onSubmit={(e) => e.preventDefault()}
            >
                <input
                    ref={searchText}
                    type="text"
                    className="p-4 m-2 col-span-9 bg-gray-700 text-white rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 hover:bg-gray-600"
                    placeholder={lang[langKey].gptSearchPlaceholder}
                />
                <button
                    className="col-span-3 m-2 bg-red-700 text-white rounded-lg font-semibold hover:bg-red-600 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg border-2 border-transparent hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                    onClick={handleGptSearchClick}
                >
                    {lang[langKey].search}
                </button>
            </form>
        </div>
    );
};

export default GptSearchBar;
