import { FaSearch } from "react-icons/fa";

export default function SearchBox({ closeModal, placeholder }) {
  function handleSearch() {
    console.log("Search clicked!");
    closeModal();
  }
  return (
    <div className="search_box">
      <input type="search" placeholder={placeholder} />
      <button onClick={handleSearch}>
        <FaSearch />
      </button>
    </div>
  );
}
