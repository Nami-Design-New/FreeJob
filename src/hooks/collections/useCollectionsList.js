import { getCollections } from "../../services/apiCollections";
import { useQuery, useQueryClient } from "@tanstack/react-query";

function useCollectionsList() {
  const { queryClient } = useQueryClient();
  const { isLoading, data, error } = useQuery({
    queryKey: ["collectionsList"],
    queryFn: () => getCollections(),
    retry: true,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  return { isLoading, data, error };
}

export default useCollectionsList;
