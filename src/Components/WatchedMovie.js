import React, { useEffect, useState } from "react";
import SelectedMovie from "./SelectedMovieList";
import axios from "axios";
import { message } from "antd";
export default function WatchedBox({
  watched,
  userEmail,
  selectedId,
  onClose,
  addToWatchList,
  handleDelete,
  KEY,
}) {
  const [isOpen2, setIsOpen2] = useState(true);

  const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  // useEffect(() => {
  //   localStorage.setItem("watched", JSON.stringify(watched));
  // }, [watched]);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {selectedId ? (
        <SelectedMovie
          movieId={selectedId}
          onClose={onClose}
          addToWatchList={addToWatchList}
          watched={watched}
          KEY={KEY}
        />
      ) : (
        isOpen2 && (
          <>
            <div className="summary">
              <h2>Movies you watched</h2>
              <div>
                <p>
                  <span>#️⃣</span>
                  <span>{watched.length} movies</span>
                </p>
                <p>
                  <span>⭐️</span>
                  <span>{avgImdbRating.toFixed(2)}</span>
                </p>
                <p>
                  <span>🌟</span>
                  <span>{avgUserRating.toFixed(2)}</span>
                </p>
                <p>
                  <span>⏳</span>
                  <span>{Number(avgRuntime).toFixed(2)} min</span>
                </p>
              </div>
            </div>

            <ul className="list list-watched">
              {watched.map((movie) => (
                <>
                  <li key={movie.imdbID}>
                    <img src={movie.poster} alt={`${movie.title} poster`} />
                    <h3>{movie.title}</h3>
                    <div>
                      <p>
                        <span>⭐️</span>
                        <span>{movie.imdbRating}</span>
                      </p>
                      <p>
                        <span>🌟</span>
                        <span>{movie.userRating}</span>
                      </p>
                      <p>
                        <span>⏳</span>
                        <span>{movie.runtime} min</span>
                      </p>
                    </div>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(movie.title)}
                    >
                      X
                    </button>
                  </li>
                </>
              ))}
            </ul>
          </>
        )
      )}
    </div>
  );
}
