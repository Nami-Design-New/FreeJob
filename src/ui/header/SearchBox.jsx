import { FaSearch } from "react-icons/fa";

export default function SearchBox() {
  return (
    <div className="search_box">
      <input type="search" placeholder="search projects" />
      <button>
        <FaSearch />
      </button>
    </div>
  );
}
