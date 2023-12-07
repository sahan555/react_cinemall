import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MdOutlineDateRange } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";

const apiKey = "3785d7ed";

const MovieDetails = () => {
  const { id } = useParams(); // Get the movie ID from the URL
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`/api/?i=${id}&apikey=${apiKey}`, {
          mode: "cors",
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "cache-control": "no-cache",
          },
        });
        const json = await response.json();
        setMovie(json);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    fetchMovieDetails();
  }, [id]);

  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [basePrice, setBasePrice] = useState(400);
  useEffect(() => {
    // Update basePrice with a random value between 400 and 600
    setBasePrice(getRandomBasePrice());
  }, []);

  // Adjust the base price range from 400 to 600
  const getRandomBasePrice = () => {
    // Generate a random number between 400 and 600
    return Math.floor(Math.random() * (600 - 400 + 1)) + 400;
  };

  const handleTicketChange = (e) => {
    // Ensure the entered value is within the specified range
    let value = parseInt(e.target.value, 10);
    value = isNaN(value) ? 1 : Math.min(12, Math.max(1, value));

    setTicketQuantity(value);
  };

  const handleTicketAdjustment = (adjustment) => {
    // Adjust the ticket quantity within the specified range
    const newQuantity = Math.min(12, Math.max(1, ticketQuantity + adjustment));
    setTicketQuantity(newQuantity);
  };
  const calculateTotalPrice = () => {
    return basePrice * ticketQuantity;
  };

  const navigate = useNavigate();

  const handleProceedToConfirmation = () => {
    const vatPrice = () => {
      return (parseFloat(calculateTotalPrice()) * 0.13).toFixed(2);
    };
    const discountPrice = () => {
      return (parseFloat(calculateTotalPrice()) * 0).toFixed(2);
    };
    const totalPrice = calculateTotalPrice();
    const vat = vatPrice();
    const discount = discountPrice();
    const dataToStore = {
      totalPrice: totalPrice,
      quantity: ticketQuantity,
      basePrice: basePrice,
      type: movie.Type,
      name: movie.Title,
      id: movie.imdbID,
      location: movie.Country,
      vatPrice: vat,
      discountPrice: discount,
      poster: movie.Poster,
    };
    localStorage.setItem("confirmationData", JSON.stringify(dataToStore));
    // Use navigate to go to the confirmation page
    navigate("/confirmation");
  };
  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="container mx-auto">
        <div className="movies-wrapper gap- gap-y- grid grid-cols-4 place-content-between py-14">
          <div className="movies-box" key={movie.imdbID}>
            <figure className="relative mb-6 h-[320px] overflow-hidden rounded-xl">
              <img
                className="h-full w-full object-cover object-center"
                src={movie.Poster}
                alt={movie.Title}
              />
              <figcaption className="absolute right-2 top-2 rounded-md bg-dark bg-opacity-80 px-3 py-2 font-medium capitalize">
                {movie.Type}
              </figcaption>
            </figure>
            <h1 className="mb-2 self-stretch text-lg font-semibold">
              {movie.Title}
            </h1>
            <ul className="flex flex-wrap">
              <li className="list-item text-xs ">{movie.Year}</li>
            </ul>
          </div>
          <div className="col-start-3 col-end-5 ml-auto w-full max-w-md bg-dark-second p-6">
            <h3 className="pb-4 text-2xl font-semibold capitalize">
              {movie.Type} Details
            </h3>
            <ul className="detail-box">
              <li>
                <MdOutlineDateRange />
                <div className="">
                  <p className="dim-color">Date and Runtime</p>
                  <h5>
                    {movie.Released} , {movie.Runtime}
                  </h5>
                </div>
              </li>
              <li>
                <IoLocationOutline />
                <div className="">
                  <p className="dim-color">Location</p>
                  <h5>{movie.Country}</h5>
                </div>
              </li>
              <li className="!block">
                <h3 className="text-2xl font-semibold capitalize ">
                  Selected tickets
                </h3>
                <div className="ticket-wrapper my-6 flex items-center justify-between">
                  <div>
                    <p className="dim-color">{ticketQuantity}x Ticket(s)</p>
                    <h4>USD {basePrice}</h4>
                  </div>
                  <div className="ticket-counter">
                    <button
                      className="rounded-md bg-dark-third px-2 ease-in hover:bg-red"
                      onClick={() => handleTicketAdjustment(-1)}
                    >
                      -
                    </button>
                    <input
                      className="back-transparent pointer-events-none w-10 px-3 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      type="number"
                      id="ticketQuantity"
                      value={ticketQuantity}
                      min={1}
                      max={12}
                      onChange={handleTicketChange}
                    />
                    <button
                      className="rounded-md bg-dark-third px-2 ease-in hover:bg-red"
                      onClick={() => handleTicketAdjustment(+1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn-red w-full"
                  onClick={handleProceedToConfirmation}
                >
                  Check out for ${calculateTotalPrice()}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
