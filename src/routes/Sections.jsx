import { useState } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import PaginationComponent from "../ui/PaginationComponent";
import SectionCard from "../ui/cards/SectionCard";
import ChooseCategoryPath from "../ui/modals/ChooseCategoryPath";
import useCategoriesList from "../hooks/categories/useCategoriesList";
import DataLoader from "../ui/DataLoader";

export default function Sections() {
  const { categories, isLoading } = useCategoriesList();
  const [currentPage, setCurrentPage] = useState(1);
  const [show, setShow] = useState(false);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSections = categories.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCloseModal = () => setShow(false);
  const handleOpenModal = () => setShow(true);

  return (
    <section className="sections">
      <section className="sections_breadcrumb">
        <section className="container">
          <Breadcrumb as="nav">
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="/sections" active>
              Sections
            </Breadcrumb.Item>
          </Breadcrumb>
        </section>
      </section>

      <section className="container">
        {isLoading ? (
          <DataLoader />
        ) : (
          <section className="row mt-5">
            {currentSections.map((section) => (
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

      <section className="mt-5 d-flex align-items-center justify-content-center">
        <PaginationComponent
          totalItems={categories.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </section>
      <ChooseCategoryPath show={show} close={handleCloseModal} />
    </section>
  );
}
