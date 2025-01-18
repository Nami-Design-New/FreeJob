import { useQuery } from "@tanstack/react-query";
import { getGategoriesWithSubcategories } from "../../services/apiCategories";

function useCategorieListWithSub() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["categoryListWithSub"],
    queryFn: getGategoriesWithSubcategories,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { isLoading, data, error };
}

export default useCategorieListWithSub;
