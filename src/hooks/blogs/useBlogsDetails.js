import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { getBlogDetails } from "../../services/apiBlogs";

function useBlogDetails() {
  const { id } = useParams();

  const { isLoading, data, error } = useQuery({
    queryKey: ["blogDetails", id],
    queryFn: () => getBlogDetails(id),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  return { isLoading, data, error };
}

export default useBlogDetails;
