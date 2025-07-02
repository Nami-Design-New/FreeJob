import { useQuery } from "@tanstack/react-query";
import { getProjectsPriceRange } from "../../services/apiServices";

export default function useGetProjectPrice() {
  const { data, isLoading } = useQuery({
    queryKey: ["price-range"],
    queryFn: getProjectsPriceRange,
  });
  return { data, isLoading };
}
