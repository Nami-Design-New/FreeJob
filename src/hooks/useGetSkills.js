import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axios";

export default function useGetSkills() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/get_skills");
        return res.data.data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  return { isLoading, data, error };
}
