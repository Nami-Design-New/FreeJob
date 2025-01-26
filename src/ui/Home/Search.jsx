import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaSearch } from "react-icons/fa";
import ChooseCategoryPath from "../modals/ChooseCategoryPath";

export default function Search() {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState("");
  const [show, setShow] = useState(false);
  const handleCloseModal = () => setShow(false);
  const handleOpenModal = () => setShow(true);
  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  function handleSearch() {
    handleOpenModal();
  }
  return (
    <>
      <section className="search_home container-fluid">
        <section className="content">
          <section className="content_text">
            <p>{t("home.heroSectionTitle")} </p>
            <p>{t("home.heroSectionSubTitle")}</p>
          </section>{" "}
          <div className="search_box">
            <input
              onChange={handleInputChange}
              type="search"
              placeholder={t("home.searchServices")}
            />
            <button onClick={handleSearch}>
              <FaSearch />
            </button>
          </div>
        </section>
      </section>
      <ChooseCategoryPath
        show={show}
        close={handleCloseModal}
        params={`searchQuery=${searchValue}`}
      />
    </>
  );
}
