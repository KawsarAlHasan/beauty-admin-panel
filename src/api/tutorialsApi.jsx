import { useQuery } from "@tanstack/react-query";
import { API } from "./api";

// get all makeup tutorials
export const useAllMakeupTutorials = ({
  page = 1,
  limit = 20,
  search,
  status,
  type,
}) => {
  const getData = async () => {
    const response = await API.get("/makeup-tutorial", {
      params: { page, limit, search, status, type },
    });
    return response.data;
  };

  const {
    data: allMakeupTutorials = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allMakeupTutorials", page, limit, search, status, type],
    queryFn: getData,
  });

  return { allMakeupTutorials, isLoading, isError, error, refetch };
};

// get single makeup tutorial
export const useSingleMakeupTutorial = (id) => {
  const getData = async () => {
    const response = await API.get(`/makeup-tutorial/${id}`);

    return response.data;
  };

  const {
    data: singleTutorial = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["singleTutorial", id],
    queryFn: getData,
  });

  return { singleTutorial, isLoading, isError, error, refetch };
};
