const SearchBar = () => {
  return (
    <div className="flex">
      <label htmlFor="searchBar"></label>
      <input
        className=" rounded-2xl p-5 "
        id="searchBar"
        type="text"
        placeholder="search.."
      />
    </div>
  );
};

export default SearchBar;
