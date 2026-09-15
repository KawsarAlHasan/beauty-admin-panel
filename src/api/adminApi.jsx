import { useQuery } from "@tanstack/react-query";
import { API } from "./api";

export const useAllAdmins = () => {
  const getData = async () => {
    const response = await API.get("/admin");

    return response.data.data;
  };

  const {
    data: allAdmins = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allAdmins"],
    queryFn: getData,
  });

  return { allAdmins, isLoading, isError, error, refetch };
};
