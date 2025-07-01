import { useState } from "react";
import { useTranslation } from "react-i18next";
import useCategoriesList from "../hooks/categories/useCategoriesList";
import DataLoader from "../ui/DataLoader";
import SectionCard from "../ui/cards/SectionCard";
import ChooseCategoryPath from "../ui/modals/ChooseCategoryPath";
import DetailsHeader from "../ui/servicesComponents/serviceDetails/DetailsHeader";

export default function Sections() {
  const { categories, isLoading } = useCategoriesList();
  const { t } = useTranslation();
  const [id, setId] = useState();
  const [show, setShow] = useState(false);

  const handleCloseModal = () => setShow(false);
  const handleOpenModal = () => setShow(true);
  function handleClick(id) {
    setId(id);
    handleOpenModal();
  }
  return (
    <section className="sections">
      <section className="header_container ">
        <section className="container-md ">
          <DetailsHeader links={t("navbar.sections")} />
        </section>
      </section>
      <section className="container">
        {isLoading ? (
          <DataLoader />
        ) : (
          <section className="row mt-5">
            {categories.map((section) => (
              <section
                key={section.id}
                onClick={() => handleClick(section?.id)}
                className="col-sm-6 col-md-4 col-lg-3 col-xl-2 g-3 section_link"
              >
                <SectionCard
                  backgroundColor={section.backgroundColor}
                  section={section}
                />
              </section>
            ))}
          </section>
        )}
      </section>
      <ChooseCategoryPath
        show={show}
        close={handleCloseModal}
        params={`categories=${id}`}
      />
    </section>
  );
}
