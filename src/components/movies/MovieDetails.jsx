import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const apiKey = "3785d7ed";

const MovieDetails = () => {
  const { id } = useParams(); // Get the movie ID from the URL
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?i=${id}&apikey=${apiKey}`,
        );
        const json = await response.json();
        setMovie(json);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="movies-wrapper grid grid-cols-4 gap-8 gap-y-8">
        <div className="movies-box" key={movie.imdbID}>
          <figure className="relative mb-6 h-[320px] overflow-hidden rounded-xl">
            <img
              className="h-full w-full object-cover object-center"
              src={movie.Poster}
              alt={movie.Title}
            />
            <figcaption className="bg-dark absolute right-2 top-2 rounded-md bg-opacity-80 px-3 py-2 font-medium capitalize">
              {movie.Type}
            </figcaption>
          </figure>
          <h4 className="mb-2 self-stretch text-lg font-semibold">
            {movie.Title}
          </h4>
          <ul className="flex flex-wrap">
            <li className="list-item text-xs ">{movie.Year}</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
