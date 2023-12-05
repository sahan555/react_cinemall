import { Link } from "react-router-dom";

const Navigation = () => {
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
      link: "/movies",
    },
  ];
  return (
    <header className="bg-dark-second border-b-grey py-2.5">
      <nav className="container mx-auto flex flex-wrap gap-12 items-center">
        <div className="logo">
          <Link to="/" className="flex gap-1 text-xl font-semibold">
            <img src="/logo.svg" alt="logo" />
            TickTicketing
          </Link>
        </div>
        <div className="nav-login-wrapper flex justify-between flex-grow items-center">
          <ul className="flex gap-8">
            {menuData.map((data) => (
              <li key={data.name}>
                <Link to={data.link} className="text-sm font-medium text-white">
                  {data.name}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex gap-2">
            <li>
              <Link to="/" className="btn-transparent inline-block">
                Login
              </Link>
            </li>
            <li>
              <Link to="/" className="btn-red inline-block">
                Register
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
