import clearView from "../../assets/clearView.png";
// import SearchBar from "./searchbar";

const Navbar = () => {
  return (
    <nav className="bg-gray-700 px-8 py-4 flex justify-between rounded">
      <img src={clearView} alt="Logo" className="h-16" />
      {/* <SearchBar /> */}
    </nav>
  );
};

export default Navbar;
