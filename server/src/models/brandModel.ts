import mongoose from "mongoose";

interface brandModelType {
  name: string;
  logo: string;
}
const brandModel = new mongoose.Schema<brandModelType>({
  name: {
    type: String,
    required: true,
  },
  logo: String,
});
export default mongoose.model("Brand", brandModel);
