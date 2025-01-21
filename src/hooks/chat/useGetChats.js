import { useQuery } from "@tanstack/react-query";
import { getChats } from "../../services/apiChats";

export default function useGetChats() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["chats"],
    queryFn: getChats,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  });
  return { isLoading, data, error };
}
