import mongoose from "mongoose";
interface couponModelData {
  name: string;
  startDate: Date;
  endDate: Date;
  discount: number;
  code: string;
  maxDiscount: number;
}
const CouponSchema = new mongoose.Schema<couponModelData>(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    startDate: {
      type: Date,
      default: new Date(),
    },
    endDate: {
      type: Date,
    },
    discount: {
      type: Number,
      required: true,
    },
    maxDiscount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Coupon", CouponSchema);
