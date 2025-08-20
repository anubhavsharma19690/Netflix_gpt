import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";
const GptMovieSuggestions = () => {
  const gpt = useSelector((store) => store.gpt);
  const { movieResults, movieNames } = gpt;

  if (!movieNames) {
    return null;
  }

  return (
    <div className="p-4 m-4 bg-black text-white bg-opacity-90">
      <div>
        {/* <MovieList title={movieNames[0]} movies={movieResults[0]} />
        <MovieList title={movieNames[1]} movies={movieResults[1]} />
        <MovieList title={movieNames[2]} movies={movieResults[2]} />
        <MovieList title={movieNames[3]} movies={movieResults[3]} />
        <MovieList title={movieNames[4]} movies={movieResults[4]} /> */}
        {movieNames.map((movieName, index) => (
          <MovieList
            key={movieName}
            title={movieName}
            movies={movieResults[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestions;
