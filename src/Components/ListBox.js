import React, { useState } from "react";
export default function ListBox({ movies, isLoading, error, onSelect }) {
  const [isOpen1, setIsOpen1] = useState(true);

  return (
    <>
      {isLoading && <p className="loader">Loading...</p>}

      {error && <p className="error">👎{error}</p>}

      {!isLoading && !error && (
        <div className="box">
          <button
            className="btn-toggle"
            onClick={() => setIsOpen1((open) => !open)}
          >
            {isOpen1 ? "-" : "+"}
          </button>
          {isOpen1 && (
            <ul className="list list-movies">
              {movies ? (
                movies.map((movie) => (
                  <>
                    <li
                      key={movie.imdbID}
                      onClick={() => onSelect(movie.imdbID)}
                    >
                      <img src={movie.Poster} alt={`${movie.Title} poster`} />
                      <h3>{movie.Title}</h3>
                      <div>
                        <p>
                          <span>🗓</span>
                          <span>{movie.Year}</span>
                        </p>
                      </div>
                    </li>
                  </>
                ))
              ) : (
                <span
                  style={{
                    fontSize: "16px",
                    lineHeight: "24px",
                    padding: "24px 12px",
                  }}
                >
                  Search for your liked movies 🍿
                </span>
              )}
            </ul>
          )}
        </div>
      )}
    </>
  );
}
