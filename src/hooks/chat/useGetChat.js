import { useQuery } from "@tanstack/react-query";
import { getTargetChat } from "../../services/apiChats";

export default function useGetChat(target) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["chat-object", target],
    queryFn: () => getTargetChat(target),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  });
  return { isLoading, data, error };
}
