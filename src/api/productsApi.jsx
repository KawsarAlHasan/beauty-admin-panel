import { useQuery } from "@tanstack/react-query";
import { API } from "./api";

// get all products
export const useProducts = ({
  search,
  status,
  brandId,
  categoryId,
  brand,
  category,
  underTone,
  finish,
  coverage,
  skinTypes,
  page = 1,
  limit = 20,
} = {}) => {
  const getData = async () => {
    const params = {};

    if (search) params.search = search;
    if (status) params.status = status;
    if (brandId) params.brandId = brandId;
    if (categoryId) params.categoryId = categoryId;
    if (brand) params.brand = brand;
    if (category) params.category = category;
    if (underTone) params.underTone = underTone;
    if (finish) params.finish = finish;
    if (coverage) params.coverage = coverage;
    if (skinTypes) params.skinTypes = skinTypes;

    params.page = page;
    params.limit = limit;

    const response = await API.get("/product", { params });
    return response.data;
  };

  const {
    data: allProducts = {},
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: [
      "allProducts",
      search || "",
      status || "",
      brandId || "",
      categoryId || "",
      brand || "",
      category || "",
      underTone || "",
      finish || "",
      coverage || "",
      skinTypes || "",
      page,
      limit,
    ],
    queryFn: getData,
  });

  return { allProducts, isLoading, isError, error, refetch };
};
