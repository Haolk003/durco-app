import mongoose from "mongoose";
interface categoryModelType {
  name: string;
  parentCategory: mongoose.Schema.Types.ObjectId;
}
const categoryModel = new mongoose.Schema<categoryModelType>({
  name: { type: String, required: true },
  parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
});
export default mongoose.model("Category", categoryModel);
