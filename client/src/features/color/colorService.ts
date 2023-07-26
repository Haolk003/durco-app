import customFetch from "../../utils/useCallApi";

const getAllColor = async () => {
  const response = await customFetch.get("/color/getAll");
  return response.data;
};
const colorService = {
  getAllColor,
};
export default colorService;
