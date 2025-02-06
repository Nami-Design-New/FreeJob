import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getRates } from "../../services/apiServices";

function useGetRates() {
  const { title } = useParams();
  const { isLoading, data, error } = useQuery({
    queryKey: ["serviceRates", title],
    queryFn: () => getRates(title),

    enabled: !!title,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  return { isLoading, data, error };
}

export default useGetRates;
