import { useState } from "react";
import InProgressCard from "../cards/InProgressCard";
import PaginationComponent from "../PaginationComponent";

export default function InProgressOrdersList({
  projectsOrdersList,
  isLoading,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  console.log(
    projectsOrdersList.data.slice(startIndex, startIndex + itemsPerPage)
  );
  let currentProducts = projectsOrdersList.data.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <section className="row g-4">
      {currentProducts.map((order) => {
        return (
          <section key={order.id}>
            <InProgressCard order={order} />
          </section>
        );
      })}

      <PaginationComponent
        totalItems={projectsOrdersList.total}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
      />
    </section>
  );
}
