import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Search from "./Components/SearchBox";
import Logo from "./Components/Logo";
import Numresults from "./Components/NumberOfResult";
import Main from "./Components/MainBody";
import ListBox from "./Components/ListBox";
import WatchedBox from "./Components/WatchedMovie";

// const apiUrl = `https://www.omdbapi.com/?apikey=${KEY}&s=interstellar`;
const KEY = "94fe3132";

export default function HomePage() {
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
