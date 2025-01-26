import { useQuery } from "@tanstack/react-query";
import { getPopularCategories } from "../../services/categoriesApi";

function usePopularCategories() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["popularCategoriesList"],
    queryFn: getPopularCategories,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { isLoading, data, error };
}

export default usePopularCategories;
