import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getComments } from "../../services/apiServices";

function useGetComments() {
  const { id } = useParams();
  const { isLoading, data, error } = useQuery({
    queryKey: ["serviceComments", id],
    queryFn: () => getComments(id),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  return { isLoading, data, error };
}

export default useGetComments;
