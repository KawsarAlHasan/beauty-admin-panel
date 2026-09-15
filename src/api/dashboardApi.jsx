import { useQuery } from "@tanstack/react-query";
import { API } from "./api";

// dashboard overview
export const useDashboardOverview = () => {
  const getData = async () => {
    const response = await API.get("/dashboard");

    return response.data.data;
  };

  const {
    data: dashboardOverview = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["dashboardOverview"],
    queryFn: getData,
  });

  return { dashboardOverview, isLoading, isError, error, refetch };
};
