import { useQuery } from "@tanstack/react-query";
import { getAbout } from "../../services/apiAbout";

export default function useGetAbout() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["getAbout"],
    queryFn: getAbout,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { isLoading, data, error };
}
