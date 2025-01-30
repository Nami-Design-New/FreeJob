import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios";

export function useGetMostOrder() {
  const { isLoading, data } = useQuery({
    queryKey: ["mostOrder"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.post("/get_services", {
          sort: "most_order",
        });
        const items = res.data.data.slice(0, 20);
        return { data: items, totla: res.data.total };
      } catch (e) {
        console.error(e);
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 60, // 1 hour
  });

  return { isLoading, data };
}
