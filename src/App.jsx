import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navigation from "./components/navbar/Navigation";
import Home from "./components/Home";
import MovieDetails from "./components/movies/MovieDetails";
import Movies from "./components/Movies";
import Series from "./components/Series";
import Confirmation from "./components/Confirmation";
import TicketDetail from "./components/TicketDetail";
// import { useEffect, useState } from "react";

const App = () => {
  return (
    <Router>
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie" element={<Movies />} />
          <Route path="/series" element={<Series />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/ticketdetail" element={<TicketDetail />} />
          <Route path="/details/:id" element={<MovieDetails />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
