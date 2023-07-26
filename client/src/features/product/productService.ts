import customFetch from "../../utils/useCallApi";
const getAllProduct = async () => {
  const response = await customFetch.get("/product/getAll");
  return response.data;
};
const getProductById = async (id: string) => {
  const response = await customFetch.get(`/product/getProductById/${id}`);
  return response.data;
};
const productService = {
  getAllProduct,
  getProductById,
};
export default productService;
