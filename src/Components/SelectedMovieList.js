import React, { useEffect, useState } from "react";
import StarRating from "./Star-rating";
export default function SelectedMovie({
  movieId,
  onClose,
  addToWatchList,
  watched,
  KEY,
}) {
  const [movieDetails, setMovieDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);
  //   const KEY = "94fe3132";
  const {
    Title: title,
    Actors: actors,
    Director: director,
    Genre: genre,
    Plot: plot,
    Poster: poster,
    imdbRating,
    imdbID,
    Released: released,
    Runtime: runtime,
    Language: language,
  } = movieDetails;

  const halndleAdding = () => {
    const newWatchedMovie = {
      poster,
      title,
      imdbID,
      imdbRating: Number(imdbRating),
      userRating,
      runtime: Number(runtime.split(" ").at(0)),
    };
    addToWatchList(newWatchedMovie);
    onClose();
  };

  const isWatched = watched.map((movie) => movie.imdbID).includes(movieId);
  const givenRating = watched.find(
    (movie) => movie.imdbID === movieId
  )?.userRating;

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;
    return function () {
      document.title = "🍿usePopcorn";
    };
  }, [title]);

  useEffect(() => {
    setLoading(true);
    async function getMovieDetails() {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${KEY}&i=${movieId}`
      );
      const data = await res.json();
      setMovieDetails(data);
      setLoading(false);
    }
    getMovieDetails();
  }, [movieId]);

  useEffect(() => {
    function callback(e) {
      if (e.code === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", callback);

    return function () {
      document.addEventListener("keydown", callback);
    };
  }, [onClose]);

  return (
    <div>
      {loading ? (
        <p className="loader">Loading...</p>
      ) : (
        <div className="details">
          <header>
            <button className="btn-back" onClick={onClose}>
              🔙
            </button>
            <img src={poster} alt={`${title} movie poster`} onClick={onClose} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} | | {runtime}
              </p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDB rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {isWatched ? (
                <p>
                  You have rated this movie with {givenRating} <span>⭐</span>
                </p>
              ) : (
                <>
                  <StarRating maxRate={10} onSetRating={setUserRating} />
                  {userRating !== 0 && (
                    <button className="btn-add" onClick={halndleAdding}>
                      + Add to list
                    </button>
                  )}
                </>
              )}
            </div>

            <h3>Language:-{language}</h3>
            <p>{genre}</p>
            <p>Director:-{director}</p>
            <p>
              <em>{plot}</em>
            </p>
            <p>Artists:-{actors}</p>
          </section>
        </div>
      )}
    </div>
  );
}
