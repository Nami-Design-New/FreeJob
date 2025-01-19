import { useQuery } from "@tanstack/react-query";
import { getUserProjects } from "../../services/apiProjects";

export default function useGetUserProjects(id) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["userProjects", id],
    queryFn: () => getUserProjects(id),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  return { isLoading, data, error };
}
