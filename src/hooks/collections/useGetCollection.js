import { useQuery } from "@tanstack/react-query";
import { getCollection } from "../../services/apiCollections";

function useGetCollection(id) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["collection", id],
    queryFn: () => getCollection(id),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  });

  return { isLoading, data, error };
}

export default useGetCollection;
