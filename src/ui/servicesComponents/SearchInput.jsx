import { useState } from "react";
import FormInput from "../form/FormInput";
import { useTranslation } from "react-i18next";

export default function SearchInput({ onSearch }) {
  const [query, setQuery] = useState("");
  const { t } = useTranslation();
  const handleInputChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <FormInput
      type="search"
      label={t("routes.search")}
      placeholder={t("routes.search")}
      value={query}
      onChange={handleInputChange}
    />
  );
}
