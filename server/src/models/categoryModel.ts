import mongoose from "mongoose";
interface categoryModelType {
  name: string;
  image: string;
}
const categoryModel = new mongoose.Schema<categoryModelType>({
  name: { type: String, required: true },
  image: { type: String },
});
export default mongoose.model("Category", categoryModel);
