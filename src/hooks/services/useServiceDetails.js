import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getServiceDetails } from "../../services/apiServices";

function useServiceDetails() {
  const { service_id } = useParams();

  const { isLoading, data, error } = useQuery({
    queryKey: ["serviceDetails", service_id],
    queryFn: () => getServiceDetails(service_id),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  return { isLoading, data, error };
}

export default useServiceDetails;
