import { useQuery } from "@tanstack/react-query";
import { getCountries } from "../../services/apiCountries";

function useCountriesList() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["countriesList"],
    queryFn: () => getCountries(),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { isLoading, data, error };
}

export default useCountriesList;
