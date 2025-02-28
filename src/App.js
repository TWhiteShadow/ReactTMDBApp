import { BrowserRouter as Router, Route, Routes } from "react-router";
import React from "react";
import HomeView from "./views/HomeView";
import GenreView from "./views/GenreView";
import SearchView from "./views/SearchView";
import MovieDetailsView from "./views/MovieDetailsView";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/genre/:genreId" element={<GenreView />} />
        <Route path="/search" element={<SearchView />} />
        <Route path="/movie/:id" element={<MovieDetailsView />} />
      </Routes>
    </Router>
  );
}

export default App;
