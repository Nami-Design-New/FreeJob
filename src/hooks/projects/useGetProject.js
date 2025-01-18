import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getProjectByName } from "../../services/apiProjects";

export default function useGetProject() {
  const { title } = useParams();
  const { isLoading, data, error } = useQuery({
    queryKey: ["project", title],
    queryFn: () => getProjectByName(title),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  return { isLoading, data, error };
}
