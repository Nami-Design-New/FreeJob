import { Pagination } from "react-bootstrap";
import SectionHeader from "../SectionHeader";
import { useState } from "react";
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const totalPages = Math.ceil(companies.length / itemsPerPage);

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
        title="Partners of Success"
        description="Most viewed and best selling projects ever"
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
        <Pagination>
          <Pagination.First
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          />
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {[...Array(totalPages).keys()].map((page) => (
            <Pagination.Item
              key={page + 1}
              active={currentPage === page + 1}
              onClick={() => handlePageChange(page + 1)}
            >
              {page + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
          <Pagination.Last
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>
    </div>
  );
}
