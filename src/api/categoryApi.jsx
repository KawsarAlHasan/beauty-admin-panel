import { useQuery } from "@tanstack/react-query";
import { API } from "./api";

// get all categories
export const useGetAllCategories = () => {
  const getData = async () => {
    const response = await API.get(`/category`);
    return response.data;
  };

  const {
    data: allCategories = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allCategories"],
    queryFn: getData,
  });

  return { allCategories, isLoading, isError, error, refetch };
};
