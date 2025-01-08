import { FaSearch } from "react-icons/fa";

export default function SearchBox({ closeModal, placeholder }) {
  function handleSearch() {
    console.log("Search clicked!");
    // Perform search logic here. For example, you can use an API endpoint to fetch search results.
    closeModal();
  }
  return (
    <div className="search_box">
      <input type="search" placeholder={placeholder} />
      <div>
        <button onClick={handleSearch}>
          <FaSearch />
        </button>
      </div>
    </div>
  );
}
