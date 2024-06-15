import { useEffect, useRef, useState } from "react";
import StarRating from "./Components/Star-rating";
import Navbar from "./Components/Navbar";
import Search from "./Components/SearchBox";
import Logo from "./Components/Logo";
import Numresults from "./Components/NumberOfResult";
import Main from "./Components/MainBody";
import ListBox from "./Components/ListBox";
import WatchedBox from "./Components/WatchedMovie";
/*
const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];
*/
// const apiUrl = `https://www.omdbapi.com/?apikey=${KEY}&s=interstellar`;
const KEY = "94fe3132";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [watched, setWatched] = useState(() => {
    return JSON.parse(localStorage.getItem("watched"));
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const handleSelectMovie = (id) => {
    setSelectedId((selectId) => (selectId === id ? null : id));
  };
  const handleclose = () => {
    setSelectedId(null);
  };
  const addToWatchList = (movie) => {
    setWatched((watched) => [...watched, movie]);
  };
  const handleDelete = (id) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  };

  // --------------useEffect using Promise--------
  /*
  useEffect(() => {
    fetch(apiUrl)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setMovies(data.Search);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
*/

  // -------------- useEffect using async-await---------

  useEffect(
    function () {
      async function fetchMovie() {
        try {
          setError("");
          setIsLoading(true);
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`
          );

          if (!res.ok) {
            throw new Error("Somthing went wrong with the data fetching");
          }
          const data = await res.json();

          if (data.Response === false) {
            throw new Error("Movie Not found");
          }
          setMovies(data.Search);
        } catch (err) {
          console.error(err.message);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      fetchMovie();
    },
    [query]
  );

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <Numresults movies={movies} />
      </Navbar>
      <Main>
        <ListBox
          movies={movies}
          isLoading={isLoading}
          error={error}
          onSelect={handleSelectMovie}
        />
        <WatchedBox
          watched={watched}
          selectedId={selectedId}
          onClose={handleclose}
          addToWatchList={addToWatchList}
          handleDelete={handleDelete}
          KEY={KEY}
        />
      </Main>
    </>
  );
}
