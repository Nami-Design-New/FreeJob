import { Pagination } from "react-bootstrap";
import SectionHeader from "../SectionHeader";
import { useState } from "react";
import PaginationComponent from "../PaginationComponent";
import { useTranslation } from "react-i18next";
const companies = [
  { id: "1", imageUrl: "./images/companylogo1.png" },
  { id: "2", imageUrl: "./images/companylogo2.png" },
  { id: "3", imageUrl: "./images/companylogo3.png" },
  { id: "4", imageUrl: "./images/companylogo4.png" },
  { id: "5", imageUrl: "./images/companylogo1.png" },
  { id: "6", imageUrl: "./images/companylogo2.png" },
  { id: "7", imageUrl: "./images/companylogo3.png" },
  { id: "8", imageUrl: "./images/companylogo4.png" },
  { id: "9", imageUrl: "./images/companylogo4.png" },
];
export default function PartnersofSuccess() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCompanies = companies.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="partner_of_success">
      <SectionHeader
        title={t("home.parteners")}
        description={t("home.partenersSubTitle")}
      />
      <div className="row mt-5">
        {currentCompanies.map((company) => (
          <div key={company.id} className="col-sm-6 col-md-4 col-lg-3">
            <div className="d-flex align-items-center justify-content-center">
              <img
                src={company.imageUrl}
                alt="Company Logo"
                className="img-fluid"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 d-flex align-items-center justify-content-center">
        <PaginationComponent
          totalItems={companies.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
