import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { getProjectsByFilter } from "../../services/apiProjects";

function useProjectsList(refetchPage) {
  const [searchParams] = useSearchParams();
  const page = refetchPage
    ? refetchPage
    : Number(searchParams.get("page")) || 1;
  const duration_from = Number(searchParams.get("duration_from"));
  const duration_to = Number(searchParams.get("duration_to"));
  const price_from = Number(searchParams.get("price_from"));
  const price_to = Number(searchParams.get("price_to"));
  const search = searchParams.get("search");
  const categories =
    searchParams.get("categories") &&
    searchParams
      .get("categories")
      .split("-")
      .map((category) => Number(category));
  const sub_categories =
    searchParams.get("sub_categories") &&
    searchParams
      .get("sub_categories")
      .split("-")
      .map((subcategory) => Number(subcategory));
  const sort = searchParams.get("sort");

  const queryKey = [
    "projectsList",
    {
      search,
      page,
      duration_from,
      duration_to,
      price_from,
      price_to,
      categories,
      sub_categories,
      sort,
    },
  ];

  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn: () =>
      getProjectsByFilter(
        search,
        page,
        categories,
        sub_categories,
        duration_from,
        duration_to,
        price_from,
        price_to,
        sort
      ),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return {
    data,
    isLoading,
    error,
  };
}

export default useProjectsList;
