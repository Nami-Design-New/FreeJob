import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { getNotifications } from "../services/apiNotifications";

export default function useGetNotifications() {
  const [cookies] = useCookies(["token"]);
  const token = cookies?.token;
  const { isLoading, data, error } = useQuery({
    queryKey: ["notifications", token],
    queryFn: getNotifications,
    retry: false,
  });
  return { isLoading, data, error };
}
