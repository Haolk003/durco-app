import mongoose, { Types } from "mongoose";

interface Product {
  product: Types.ObjectId;
  count: number;
  color: string;
}
interface ICart {
  products: Product[];
  createdBy: Types.ObjectId;
  cartTotal: number;
  totalAfterDicount: number;
}
const cartModel = new mongoose.Schema<ICart>({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
      count: { type: Number, default: 1 },
      color: { type: String },
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cartTotal: {
    type: Number,
    default: 0,
  },
  totalAfterDicount: {
    type: Number,
  },
});
export default mongoose.model("Cart", cartModel);
