import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios";

function useSearchWorks() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const skills = searchParams.get("skills")?.split("-");
  const duration = searchParams.get("duration");
  const sort = searchParams.get("sort");
  const page = Number(searchParams.get("page")) || 1;

  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ["portfolios", search, skills, duration, sort, page],

    queryFn: async () => {
      try {
        const payload = {};
        if (search) payload.search = search;
        if (skills) payload.skills = skills.map((id) => Number(id));
        if (duration) payload.duration = duration;
        if (sort) payload.sort = sort;

        const response = await axiosInstance.post("search_works", {
          ...payload,
          page,
        });
        if (response.data.code === 200) {
          return {
            data: response.data.data,
            total: response.data.total,
          };
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { isLoading, data, error, refetch };
}

export default useSearchWorks;
