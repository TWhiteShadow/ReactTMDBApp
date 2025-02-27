import { BrowserRouter as Router, Route, Routes } from "react-router";
import React from "react";
import HomeView from "./views/HomeView";
import GenreView from "./views/GenreView";
import SearchView from "./views/SearchView";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/genre/:genreId" element={<GenreView />} />
        <Route path="/search" element={<SearchView />} />
      </Routes>
    </Router>
  );
}

export default App;
