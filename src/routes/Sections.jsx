import { useState } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import PaginationComponent from "../ui/PaginationComponent";
import SectionCard from "../ui/cards/SectionCard";
import ChooseCategoryPath from "../ui/modals/ChooseCategoryPath";
import useCategoriesList from "../hooks/categories/useCategoriesList";
import DataLoader from "../ui/DataLoader";
import CustomPagination from "../ui/CustomPagination";
import DetailsHeader from "../ui/servicesComponents/serviceDetails/DetailsHeader";
import { useTranslation } from "react-i18next";

export default function Sections() {
  const { categories, isLoading } = useCategoriesList();
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  const handleCloseModal = () => setShow(false);
  const handleOpenModal = () => setShow(true);

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
                onClick={handleOpenModal}
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
      <ChooseCategoryPath show={show} close={handleCloseModal} />
    </section>
  );
}
