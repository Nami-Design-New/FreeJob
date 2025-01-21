import InProgressCard from "../cards/InProgressCard";
import CustomPagination from "../CustomPagination";

export default function InProgressOrdersList({ projectsOrdersList }) {
  return (
    <section className="row g-4">
      {projectsOrdersList?.data?.map((order) => {
        return (
          <section key={order?.id}>
            <InProgressCard order={order} />
          </section>
        );
      })}

      {projectsOrdersList && projectsOrdersList?.total > 10 && (
        <CustomPagination count={projectsOrdersList?.total} pageSize={10} />
      )}
    </section>
  );
}
