import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getRates } from "../../services/apiServices";

function useGetRates() {
  const { id } = useParams();
  const { isLoading, data, error } = useQuery({
    queryKey: ["serviceRates", id],
    queryFn: () => getRates(id),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  return { isLoading, data, error };
}

export default useGetRates;
