import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const apiKey = "3785d7ed";
const apiUrl = "https://www.omdbapi.com/";

const Search = ({name,type}) => {
    console.log(type)
  const [data, setData] = useState(null);
    const url = `${apiUrl}?s=${name}&apikey=${apiKey}&sort_by=release_date&type=${type}`;
  const fetchData = async () => {
    const response = await fetch(url);
    const json = await response.json();
    console.log(json);
    setData(json.Search);
  };

  console.log(data);

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="movies-wrapper grid grid-cols-4 gap-8 gap-y-8">
        {data?.map((data) => (
          <div className="movies-box" key={data.imdbID}>
            <Link to={`/details/${data.imdbID}`}>
              <figure className="relative mb-6 h-[320px] overflow-hidden rounded-xl hover:scale-95 transition-all ease-in-out">
                <img
                  className="h-full w-full object-cover object-center"
                  src={data.Poster}
                  alt={data.Title}
                />
                <figcaption className="bg-dark absolute right-2 top-2 rounded-md bg-opacity-80 px-3 py-2 font-medium capitalize">
                  {data.Type}
                </figcaption>
              </figure>
              <h4 className="mb-2 self-stretch text-lg font-semibold">
                {data.Title}
              </h4>
              <ul className="flex flex-wrap">
                <li className="list-item text-xs ">{data.Year}</li>
              </ul>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Search;
