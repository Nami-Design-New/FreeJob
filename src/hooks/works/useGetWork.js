import { useQuery } from "@tanstack/react-query";
import { getWork } from "../../services/apiWorks";
import { useParams } from "react-router-dom";

export function useGetWork() {
  const { title } = useParams();
  console.log(title);

  const { data, isLoading, error } = useQuery({
    queryKey: ["work", title],
    queryFn: () => getWork(title),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });

  return { isLoading, data, error };
}
