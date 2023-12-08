import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";

const Navigation = () => {
  const [isMenuVisible, setMenuVisibility] = useState(window.innerWidth > 768);

  const toggleMenu = () => {
    // Check the window width and add/remove 'overflow-hidden' class accordingly
    if (window.innerWidth < 768) {
      document.body.classList.toggle("overflow-hidden");
    }
    setMenuVisibility(!isMenuVisible);
  };

  const closeMenu = () => {
    // Close the menu and remove 'overflow-hidden' class when the screen is smaller
    if (window.innerWidth < 768) {
      document.body.classList.remove("overflow-hidden");
      setMenuVisibility(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setMenuVisibility((prevIsMenuVisible) => {
        // Check the window width and add/remove 'overflow-hidden' class accordingly
        if (window.innerWidth < 768 && prevIsMenuVisible) {
          document.body.classList.remove("overflow-hidden");
          return false;
        }
        return prevIsMenuVisible;
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const menuData = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Series",
      link: "/series",
    },
    {
      name: "Movies",
      link: "/movie",
    },
  ];

  return (
    <header className="border-b-grey bg-dark-second py-2.5">
      <nav className="container mx-auto flex flex-wrap items-center gap-12 max-lg:px-6  max-md:relative max-md:py-4">
        <div className="logo">
          <Link to="/" className="flex gap-1 text-xl font-semibold">
            <img src="/logo.svg" alt="logo" />
            TickTicketing
          </Link>
        </div>
        <button
          className={`relative z-10 ml-auto hidden pr-5 text-2xl outline-none max-md:block ${
            isMenuVisible ? "hidden" : ""
          }`}
          onClick={toggleMenu}
        >
          {isMenuVisible ? <RxCross1 /> : <CiMenuBurger />}
        </button>
        {isMenuVisible && (
          <div
            className="block max-md:fixed max-md:left-0 max-md:top-0  max-md:z-[8] max-md:h-full max-md:w-full max-md:bg-dark max-md:opacity-80 "
            onClick={closeMenu} // Close the menu when clicking on the overlay
          ></div>
        )}
        {isMenuVisible && (
          <div
            className="nav-login-wrapper flex flex-grow items-center justify-between max-md:absolute max-md:right-0 max-md:top-[117%] max-md:z-10 max-md:h-screen max-md:w-[70%] max-md:flex-col max-md:justify-normal max-md:bg-grey max-md:p-4 "
            onClick={closeMenu}
          >
            <ul className="flex gap-8 max-md:block max-md:w-full max-md:text-left">
              {menuData.map((data) => (
                <li key={data.name} className="max-md:py-3 max-md:first:pt-0">
                  <Link
                    to={data.link}
                    className="text-sm font-medium text-white max-md:text-base"
                  >
                    {data.name}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="flex gap-2 max-md:mt-3 max-md:w-full max-md:border-t max-md:border-solid max-md:border-[#aaa] max-md:pt-3">
              <li className="max-md:w-1/2">
                <Link
                  to="/"
                  className="btn-transparent inline-block border-white max-md:w-full max-md:text-center"
                >
                  Login
                </Link>
              </li>
              <li className="max-md:w-1/2">
                <Link
                  to="/"
                  className="btn-red inline-block max-md:w-full max-md:text-center"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navigation;
