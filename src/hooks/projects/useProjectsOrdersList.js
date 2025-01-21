import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjectsOrders } from "../../services/apiProjects";

function useProjectsOrdersList() {
  const [searchParams] = useSearchParams();
  const status =
    searchParams.get("status") && searchParams.get("status").split("-");
  const page = Number(searchParams.get("page")) || 1;

  const { isLoading, data, error } = useQuery({
    queryKey: ["projectsOrdersList", status, page],
    queryFn: () => getProjectsOrders({ page, status }),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { isLoading, data, error };
}

export default useProjectsOrdersList;
