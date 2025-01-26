import { useQuery } from "@tanstack/react-query";
import { getSubCategories } from "../../services/apiCategories";

function useSubCategoriesList(id) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["subCategoriesList", id],
    queryFn: () => getSubCategories(id),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  });

  return { isLoading, data, error };
}

export default useSubCategoriesList;
