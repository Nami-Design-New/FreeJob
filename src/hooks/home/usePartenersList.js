import { useQuery } from "@tanstack/react-query";
import { getParteners } from "../../services/apiPartners";

function usePartenersList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["partenersList"],
    queryFn: getParteners,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  return { data, isLoading, error };
}

export default usePartenersList;
