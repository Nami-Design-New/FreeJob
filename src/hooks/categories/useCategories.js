import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../services/apicategories";

function useCategoriesList() {
  const {
    isLoading,
    data: categories,
    error,
  } = useQuery({
    queryKey: ["categoryList"],
    queryFn: getCategories,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { isLoading, categories, error };
}

export default useCategoriesList;
