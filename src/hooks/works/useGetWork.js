import { useQuery } from "@tanstack/react-query";
import { getWork } from "../../services/apiWorks";
import { useParams } from "react-router-dom";

export function useGetWork() {
  const { id } = useParams();
  console.log(Number(id));

  const { data, isLoading, error } = useQuery({
    queryKey: ["work"],
    queryFn: () => getWork(Number(id)),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });

  return { isLoading, data, error };
}
