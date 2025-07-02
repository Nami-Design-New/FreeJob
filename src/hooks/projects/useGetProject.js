import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getProjectById } from "../../services/apiProjects";

export default function useGetProject() {
  const { id } = useParams();
  console.log(id);

  const { isLoading, data, error } = useQuery({
    queryKey: ["project", id],
    queryFn: () => getProjectById(id),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  return { isLoading, data, error };
}
