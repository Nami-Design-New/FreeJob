import { useState } from "react";
import { useTranslation } from "react-i18next";
import DataLoader from "../DataLoader";
import PaginationComponent from "../PaginationComponent";
import SectionHeader from "../SectionHeader";
import usePartenersList from "../../hooks/usePartenersList";

export default function PartnersofSuccess() {
  const { data: parteners, isLoading, error } = usePartenersList();
  console.log(parteners);

  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentParteners = (parteners || []).slice(
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
        {isLoading ? (
          <DataLoader />
        ) : (
          currentParteners.map((partener) => (
            <div key={partener.id} className="col-sm-6 col-md-4 col-lg-3">
              <div className="d-flex align-items-center justify-content-center">
                <img
                  src={partener.image}
                  alt="Company Logo"
                  className="img-fluid"
                />
              </div>
            </div>
          ))
        )}
      </div>
      <div className="mt-5 d-flex align-items-center justify-content-center">
        <PaginationComponent
          totalItems={(parteners || []).length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
