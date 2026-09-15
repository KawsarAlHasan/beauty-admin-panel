import { useQuery } from "@tanstack/react-query";
import { API } from "./api";

// get all brands
export const useGetAllbrands = () => {
  const getData = async () => {
    const response = await API.get("/brand");
    return response.data;
  };

  const {
    data: allbrands = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allbrands"],
    queryFn: getData,
  });

  return { allbrands, isLoading, isError, error, refetch };
};
