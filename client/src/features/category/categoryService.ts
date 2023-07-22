import customFetch from "../../utils/useCallApi";
const getAllCategory = async () => {
  const categories = await customFetch.get("/category/getAll");
  return categories.data;
};
const categoryService = {
  getAllCategory,
};
export default categoryService;
