import customFetch from "../../utils/useCallApi";
const getAllProduct = async () => {
  const response = await customFetch.get("/product/getAll");
  return response.data;
};
interface QueryProduct {
  keyword?: string;
  page?: number;
  color?: string;
  sort?: string;
  category?: string;
  brand?: string;
  "price[lte]"?: number;
  "price[gte]"?: number;
  limit?: number;
}
const getFilterProduct = async (query: QueryProduct) => {
  const response = await customFetch.get("/product/filterProduct", {
    params: query,
  });
  return response.data;
};
const getProductById = async (id: string) => {
  const response = await customFetch.get(`/product/getProductById/${id}`);
  return response.data;
};
const productService = {
  getAllProduct,
  getProductById,
  getFilterProduct,
};
export default productService;
