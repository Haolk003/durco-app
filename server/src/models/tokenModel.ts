import mongoose, { Schema } from "mongoose";
interface tokenSchemaType {
  userId: mongoose.Schema.Types.ObjectId;
  token: string;
  createdAt: Date;
  type: string;
}
const tokenSchema = new mongoose.Schema<tokenSchemaType>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
    expires: 3600 * 24,
  },
});
export default mongoose.model("Token", tokenSchema);
