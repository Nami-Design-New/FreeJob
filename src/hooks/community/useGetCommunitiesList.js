import { useQuery } from "@tanstack/react-query";
import { getCommunities } from "../../services/apiCommunities";

function useGetCommunitiesList() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["communitiesList"],
    queryFn: () => getCommunities(),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { isLoading, data, error };
}

export default useGetCommunitiesList;
