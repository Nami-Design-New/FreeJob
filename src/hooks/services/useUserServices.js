import { useQuery } from "@tanstack/react-query";
import { getUserServices } from "../../services/apiServices";

export default function useUserServices(id) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["userServices", id],
    queryFn: () => getUserServices(id),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  return { isLoading, data, error };
}
