import { useQuery } from "@tanstack/react-query";
import { API } from "./api";

// get all users
export const useAllUsers = ({ page = 1, limit = 20, search }) => {
  const getData = async () => {
    const response = await API.get("/user", {
      params: { page, limit, search },
    });
    return response.data;
  };

  const {
    data: allUsers = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allUsers", page, limit, search],
    queryFn: getData,
  });

  return { allUsers, isLoading, isError, error, refetch };
};
