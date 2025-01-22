import { useQuery } from "@tanstack/react-query";
import { getCommunityPosts } from "../../services/apiCommunities";

function useCommunityPosts(name) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["communityPosts", name],
    queryFn: () => getCommunityPosts(name),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  return { isLoading, data, error };
}

export default useCommunityPosts;
