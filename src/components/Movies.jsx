import Search from "./movies/Search";

const Movies = () => {
  return (
    <div className="container mx-auto">
      <div className="py-14">
        <Search name="Avenger" type="movie" />
      </div>
    </div>
  );
};

export default Movies;
