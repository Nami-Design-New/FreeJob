import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getMyProjectRequests } from "../../services/apiProjects";

function useGetMyProjectRequestsList() {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get("sort");

  const { isLoading, data, error } = useQuery({
    queryKey: ["myProjectRequests", sort],
    queryFn: () => getMyProjectRequests(sort),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  return { isLoading, data, error };
}

export default useGetMyProjectRequestsList;
