import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "../../services/apiBlogs";

function useBlogsList() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["blogsList"],
    queryFn: () => getBlogs(),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { isLoading, data, error };
}

export default useBlogsList;
