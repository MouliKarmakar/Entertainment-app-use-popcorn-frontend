import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Components/Navbar";
import Search from "./Components/SearchBox";
import Logo from "./Components/Logo";
import Numresults from "./Components/NumberOfResult";
import Main from "./Components/MainBody";
import ListBox from "./Components/ListBox";
import WatchedBox from "./Components/WatchedMovie";

// const apiUrl = `https://www.omdbapi.com/?apikey=${KEY}&s=interstellar`;
const KEY = "94fe3132";

export default function HomePage({ userEmail }) {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [watched, setWatched] = useState([]);
  // () => {
  //   return JSON.parse(localStorage.getItem("watched"));
  // }
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const handleSelectMovie = (id) => {
    setSelectedId((selectId) => (selectId === id ? null : id));
  };

  const handleClose = () => {
    setSelectedId(null);
  };

  const addToWatchList = async (movie) => {
    setWatched((watched) => [...watched, movie]);
    try {
      const response = await axios.post(
        "https://entertainment-app-use-popcorn-backend.onrender.com/watched",
        {
          email: userEmail,
          newMovie: movie,
        }
      );
      alert(response.data.message);
    } catch (error) {
      alert("Failed to add movie to watch list", error);
    }
  };

  const handleDelete = async (title) => {
    setWatched((watched) => watched.filter((movie) => movie.title !== title));
    try {
      const response = await axios.delete(
        "https://entertainment-app-use-popcorn-backend.onrender.com/watched",
        {
          data: { email: userEmail, title: title }, // Pass data in the `data` property
        }
      );
      alert(response.data.message);
    } catch (err) {
      alert("Failed to delete movie from watch list", err);
    }
  };

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
            throw new Error("Something went wrong with the data fetching");
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

  useEffect(() => {
    const fetchWatchedList = async () => {
      try {
        const response = await axios.get(
          "https://entertainment-app-use-popcorn-backend.onrender.com/watched",
          {
            params: { email: userEmail },
          }
        );
        setWatched(response.data);
      } catch (error) {
        setError("Add new movies to your watch list");
        console.error("Failed to fetch watched list", error);
      }
    };

    fetchWatchedList();
  }, [userEmail]); // Dependency on userEmail only

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
          userEmail={userEmail}
          selectedId={selectedId}
          onClose={handleClose}
          addToWatchList={addToWatchList}
          handleDelete={handleDelete}
          KEY={KEY}
        />
      </Main>
    </>
  );
}
