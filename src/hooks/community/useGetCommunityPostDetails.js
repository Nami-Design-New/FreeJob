import { useQuery } from "@tanstack/react-query";
import { getCommunityPostDetails } from "../../services/apiCommunities";
import { useParams } from "react-router-dom";

function useGetCommunityPostDetails() {
  const { title } = useParams();
  console.log(useParams());
  const { isLoading, data, error } = useQuery({
    queryKey: ["communityPostDetails", title],
    queryFn: () => getCommunityPostDetails(title),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  return { isLoading, data, error };
}

export default useGetCommunityPostDetails;
