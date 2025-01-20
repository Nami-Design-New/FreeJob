import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import axiosInstance from "../../utils/axios";

function useGetWalletOperations() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const status = searchParams?.get("status")?.split("-");

  const { isLoading, data, error } = useQuery({
    queryKey: ["wallet-operations", page, status],

    queryFn: async () => {
      try {
        const res = await axiosInstance.post("/user/get_wallet_operations", {
          page,
          skip: 8,
          filter: status,
        });
        return {
          data: res.data.data,
          total: res.data.total,
        };
      } catch (error) {
        console.log(error);
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

export default useGetWalletOperations;
