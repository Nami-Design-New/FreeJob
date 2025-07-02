import { useQuery } from "@tanstack/react-query";
import { getProjectsPriceRange } from "../../services/apiProjects";

export default function useGetProjectPrice() {
  const { data, isLoading } = useQuery({
    queryKey: ["project-price-range"],
    queryFn: getProjectsPriceRange,
  });
  return { data, isLoading };
}
