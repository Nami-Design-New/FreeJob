import { useState } from "react";
import FormInput from "../form/FormInput";

export default function SearchInput({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <FormInput
      type="search"
      label="Search"
      placeholder="Search..."
      value={query}
      onChange={handleInputChange}
    />
  );
}
