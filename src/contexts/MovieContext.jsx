import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext(null);

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovieContext must be used within a MovieProvider");
  }
  return context;
};

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavs = localStorage.getItem("favorites");

    if (storedFavs) {
      try {
        setFavorites(JSON.parse(storedFavs));
      } catch (error) {
        console.error("Error parsing favorites from localStorage:", error);
        setFavorites([]); // Reset if JSON is invalid
      }
    } else {
      setFavorites([]); // Ensure a default empty array
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (movie) => {
    setFavorites((prev) => [...prev, movie]);
  };

  const removeFromFavorites = (movieId) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isFavorite = (movieId) => favorites.some((movie) => movie.id === movieId);

  const value = { favorites, addToFavorites, removeFromFavorites, isFavorite };

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};
