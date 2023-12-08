import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const apiKey = "3785d7ed";
const apiUrl = "https://www.omdbapi.com/";

const Search = ({ name, type }) => {
  console.log(type);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      const url = `${apiUrl}?s=${name}&apikey=${apiKey}&type=${type}`;
      const script = document.createElement('script');
      script.src = `${url}&callback=handleJsonpResponse`;
  
      // Define a global callback function
      window.handleJsonpResponse = (response) => {
        setData(response.Search);
        // Ensure the script is a child of document.head before removing
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
  
      // Append the script to the document.head
      document.head.appendChild(script);
    };
  
    fetchData();
  }, [name, type]);

  console.log(data);

  return (
    <>
      <div className="movies-wrapper grid grid-cols-4 gap-8 gap-y-8">
        {data?.map((data) => (
          <div className="movies-box" key={data.imdbID}>
            <Link to={`/details/${data.imdbID}`}>
              <figure className="relative mb-6 h-[320px] overflow-hidden rounded-xl transition-all ease-in-out hover:scale-95">
                <img
                  className="h-full w-full object-cover object-center"
                  src={data.Poster}
                  alt={data.Title}
                />
                <figcaption className="absolute right-2 top-2 rounded-md bg-dark bg-opacity-80 px-3 py-2 font-medium capitalize">
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
