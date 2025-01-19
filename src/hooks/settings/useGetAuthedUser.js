import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios";

export default function useGetAuthedUser(enabled, id) {
  const { isLoading, data, error, refetch, isFetched } = useQuery({
    queryKey: ["authed-user"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get(`/get_profile?id=${id}`);
        if (res.status === 200) {
          return res.data.data || {};
        }
      } catch (error) {
        console.error("Error fetching profile:", error.message);
        throw error;
      }
    },
    enabled,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  return { isLoading, data, error, refetch, isFetched };
}
