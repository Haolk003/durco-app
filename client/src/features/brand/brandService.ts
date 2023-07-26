import customFetch from "../../utils/useCallApi";

const getAllBrand = async () => {
  const brands = await customFetch.get("/brand/getAll");
  return brands;
};
const brandService = {
  getAllBrand,
};
export default brandService;
