import { useQuery } from "@tanstack/react-query";
import { getWorks } from "../../services/apiWorks";

export default function useGetWorks(id) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["userWorks", id],
    queryFn: () => getWorks(id),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  return { isLoading, data, error };
}
