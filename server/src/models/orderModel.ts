import mongoose from "mongoose";

interface Product {
  product: mongoose.Schema.Types.ObjectId;
  count: number;
  color: string;
}
interface paymentIntentType {
  amount: number;
  currency: string;
  status: string;
  created: Date;
  id: string;
  paymentMethod: string;
}
interface orderModelType {
  products: Product[];
  paymentIntent: paymentIntentType;
  orderStatus: string;
  orderBy: mongoose.Schema.Types.ObjectId;
  address: string;
  phone: string;
  type: string;
  paymentMethod: string;
  amount: number;
}
const OrderModel = new mongoose.Schema<orderModelType>(
  {
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        count: Number,
        color: String,
      },
    ],
    paymentIntent: {},
    address: { type: String, required: true },
    phone: { type: String, required: true },
    orderBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    orderStatus: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Processing", "Cancle", "Delivered"],
    },
    paymentMethod: {
      type: String,
      enum: ["card", "cash"],
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Order", OrderModel);
