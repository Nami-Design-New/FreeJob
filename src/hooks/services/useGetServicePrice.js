import { useQuery } from "@tanstack/react-query";
import { getServicesPriceRange } from "../../services/apiServices";

export default function useGetServicePrice() {
  const { data, isLoading } = useQuery({
    queryKey: ["service-price-range"],
    queryFn: getServicesPriceRange,
  });
  return { data, isLoading };
}
