import { useQuery } from "@tanstack/react-query";
import { getLatestProjects } from "../../services/apiProjects";

export default function useGetLatestProjects() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["latestProjects"],
    queryFn: getLatestProjects,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  return { isLoading, data, error };
}
