import { getCollections } from "../../services/apiCollections";
import { useQuery } from "@tanstack/react-query";

function useCollectionsList() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["collectionsList"],
    queryFn: () => getCollections(),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  });

  return { isLoading, data, error };
}

export default useCollectionsList;
