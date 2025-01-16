import { Link } from "react-router";
import { useEffect } from "react";
import ServiceCard from "../cards/ServiceCard";
import useSearchServicesList from "../../hooks/services/useSearchServicesList";
import DataLoader from "../DataLoader";

export default function ServicesList() {
  const {
    data: searchServicesList,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useSearchServicesList();

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000
      ) {
        if (!isFetchingNextPage && hasNextPage) {
          fetchNextPage();
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

  return isFetching ? (
    <DataLoader />
  ) : (
    <>
      {searchServicesList.map((service) => (
        <section key={service.id} className="service_card_filter">
          <Link to={service.id}>
            <ServiceCard service={service} />
          </Link>
        </section>
      ))}
    </>
  );
}
