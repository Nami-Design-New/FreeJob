import { useQuery } from "@tanstack/react-query";
import { getHomeServices } from "../../services/apiServices";

export default function useGetHomeServices() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["homeServices"],
    queryFn: getHomeServices,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  return { isLoading, data, error };
}
