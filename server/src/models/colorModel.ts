import mongoose from "mongoose";
interface colorTypes {
  name: String;
  code: String;
}
const colorSchema = new mongoose.Schema<colorTypes>({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
});
export default mongoose.model("color", colorSchema);
