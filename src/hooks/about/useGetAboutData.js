import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getAboutData } from "../../services/apiAbout";
function useGetAboutData() {
  const { id } = useParams();

  const { isLoading, data, error } = useQuery({
    queryKey: ["getAboutData", id],
    queryFn: () => getAboutData(id),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { isLoading, data, error };
}

export default useGetAboutData;
