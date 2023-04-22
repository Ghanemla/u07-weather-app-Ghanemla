import logo from "../assets/ClrearView-logo.png";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 px-8 py-4 flex justify-between">
      <img src={logo} alt="Logo" className="h-16" />
      <div className="flex">
        <label htmlFor="searchBar"></label>
        <input
          className=" rounded-2xl p-5 "
          id="searchBar"
          type="text"
          placeholder="search.."
        />
      </div>
    </nav>
  );
};

export default Navbar;
