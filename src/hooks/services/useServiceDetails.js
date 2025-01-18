import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getServiceDetails } from "../../services/apiServices";

function useServiceDetails() {
  const { title } = useParams();

  const { isLoading, data, error } = useQuery({
    queryKey: ["serviceDetails", title],
    queryFn: () => getServiceDetails(title),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  return { isLoading, data, error };
}

export default useServiceDetails;
