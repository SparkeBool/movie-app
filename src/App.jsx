import { Route, Routes } from "react-router-dom";
import "./css/App.css";
import Home from "./pages/Home";
import Favorite from "./pages/Favorite";
import Navbar from "./components/Navbar";
import { MovieProvider } from "./contexts/MovieContext";

function App() {
  return (
    <>
      <MovieProvider>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favourites" element={<Favorite />} />
          </Routes>
        </main>
      </MovieProvider>
    </>
  );
}

export default App;
