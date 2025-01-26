import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../../services/apiCategories";

function useGetCategoryById(id) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategory(id),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  });

  return { isLoading, data, error };
}

export default useGetCategoryById;
