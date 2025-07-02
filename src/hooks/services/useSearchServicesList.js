import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { getServicesByFilter } from "../../services/apiServices";

function useSearchServicesList(refetchPage) {
  const [searchParams] = useSearchParams();
  const page = refetchPage
    ? refetchPage
    : Number(searchParams.get("page")) || 1;
  const search = searchParams.get("searchQuery");
  const price_from = Number(searchParams.get("price_from"));
  const price_to = Number(searchParams.get("price_to"));
  const rate = Number(searchParams.get("rate"));
  const user_verification = Number(searchParams.get("user_verification"));
  const skills = searchParams.get("skills")?.split("-");
  const user_available = Number(searchParams.get("user_available"));
  console.log(price_from, price_to);

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

  const is_old = Number(searchParams.get("is_old"));
  const sort = searchParams.get("sort");

  const queryKey = [
    "searchServicesList",
    {
      search,
      page,
      rate,
      user_verification,
      user_available,
      categories,
      sub_categories,
      is_old,
      skills,
      sort,
      price_from,
      price_to,
    },
  ];

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useQuery({
      queryKey,
      queryFn: () =>
        getServicesByFilter(
          search,
          page,
          rate,
          user_verification,
          user_available,
          categories,
          sub_categories,
          is_old,
          skills,
          sort,
          price_from,
          price_to
        ),

      keepPreviousData: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  };
}

export default useSearchServicesList;
