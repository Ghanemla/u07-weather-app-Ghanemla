import clearView from "../../assets/clearView.png";
import SearchBar from "./searchbar";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 px-8 py-4 flex justify-between">
      <img src={clearView} alt="Logo" className="logo logo-spin" />
      <SearchBar />
    </nav>
  );
};

export default Navbar;
