import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getProjectById } from "../../services/apiProjects";

export default function useGetProject() {
  const { project_id } = useParams();
  console.log(project_id);

  const { isLoading, data, error } = useQuery({
    queryKey: ["project", title],
    queryFn: () => getProjectById(project_id),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  return { isLoading, data, error };
}
