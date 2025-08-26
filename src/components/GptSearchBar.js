import React, { useEffect, useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addgptMovieResult } from "../utils/gptSlice";
import { GoogleGenerativeAI } from "@google/generative-ai";

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
        try {

            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const prompt = `Act as a movie recommendation system and suggest exactly 5 movies based on this request: ${searchText.current.value}. Return ONLY movie titles separated by commas, nothing else. For example: "Movie1, Movie2, Movie3, Movie4, Movie5"`;
            const result = await model.generateContent(prompt);

            const movieList = result.response.text();

            console.log("movieList", movieList);

            // const movieList = ["Iron man", "Hulk", "Spider", "Incredible", "Saiyaara"];

            // Search for each recommended movie
            const promiseArray = movieList.map((movie) => searchMovieTmdb(movie));
            const tmdbResults = await Promise.all(promiseArray);

            // Dispatch results to Redux store
            dispatch(
                addgptMovieResult({ movieNames: movieList, movieResults: tmdbResults })
            );
        } catch (error) {
            console.error("Error fetching movies:", error);
        }

        // const gptQuery =
        //     "Act as a movie recommendation system. Based on the user's input, suggest movies that match their preferences. The user will provide a description of what they are looking for in a movie, and you will return a list of  5 movies titles , seperated that fit those criteria. Example Result: Gadar, Golmaal,Koi Mil Gya, Sholay, Don " +
        //     searchText.current.value;

        // console.log("openai", openai);

        // // Make an api call to gpt api and get movie results

        // // const gptResults = await openai.chat.completions.create({
        // //     model: 'gpt-4o',
        // //     messages: [
        // //         { role: 'developer', content: 'Talk like a pirate.' },
        // //         { role: 'user', content: 'Are semicolons optional in JavaScript?' },
        // //     ],
        // //     // messages: [

        // //     //     { role: 'user', content: gptQuery },
        // //     // ],
        // // });
        // const gptResults = {
        //     choices: [
        //         { message: { content: "Iron Man, Hulk, Spider Man, Incredible, Saiyaara" } },
        //     ],
        // };
        // console.log("GPT Results:", gptResults.choices?.[0]?.message?.content);
        // //If Gpt Api fails
        // if (!gptResults.choices || gptResults.choices.length === 0) {
        //     console.error("No results found from GPT");
        //     return;
        // }

        // const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");

        // For Each movie I will call search  TMDB Api and get the movie details
        // const promiseArray = gptMovies?.map((movie) => searchMovieTmdb(movie))

        // // will get array of promises
        // const tmdbResults = await Promise.all(promiseArray); // will get array of results
        // console.log("TMDB Results:", tmdbResults);
        // dispatch(addgptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults }))
    };

    return (
        // <div className="pt-[35%]   md:pt-[10%] flex justify-center">
        //     <form
        //         className="w-full md:w-1/2 bg-black grid grid-cols-12"
        //         onSubmit={(e) => e.preventDefault()}
        //     >
        //         <input
        //             ref={searchText}
        //             type="text"
        //             className="p-4 m-4 col-span-9"
        //             placeholder={lang[langKey].gptSearchPlaceholder}
        //         />
        //         <button
        //             className="py-2 px-4 m-4 bg-red-700 text-white rounded-lg col-span-3"
        //             onClick={handleGptSearchClick}
        //         >
        //             {lang[langKey].search}
        //         </button>
        //     </form>
        // </div>

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
