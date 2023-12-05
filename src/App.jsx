import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navigation from "./components/navbar/Navigation";
import Home from "./components/Home";
import MovieDetails from "./components/movies/MovieDetails";
import Movies from "./components/Movies";
import Series from "./components/Series";
// import { useEffect, useState } from "react";

const App = () => {
  return (
    <Router>
      <Navigation />
      <main className="py-14">
        <div className="container mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/series" element={<Series />} />
            <Route path="/details/:id" element={<MovieDetails />} />
          </Routes>
        </div>
      </main>
    </Router>
  );
};

export default App;
