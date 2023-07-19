import mongoose from "mongoose";
interface productModelType {
  banner: string;
  imageList: [string];
  price: number;
  sold: number;
  quanlity: number;
  discount: number;
  title: string;
  status: string;
  color: [string];
  brand: string;
  tags: [string];
  sku: string;
  descripiton: string;
  category: mongoose.Schema.Types.ObjectId;
}
const productModel = new mongoose.Schema<productModelType>(
  {
    banner: {
      type: String,
      required: true,
    },
    imageList: {
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    brand: {
      type: String,
      required: true,
    },
    color: {
      type: [String],
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    descripiton: {
      type: String,
    },
    quanlity: {
      type: Number,
      default: 0,
    },
    sku: {
      type: String,
    },
    status: {
      enum: ["inStock", "outStock"],
      type: String,
      default: "inStock",
    },
    tags: {
      type: [String],
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

productModel.pre("save", async function () {
  const name = this.title.toLowerCase().replace(/\s/g, "");
  const brand = this.brand.toLowerCase().replace(/\s/g, "");
  const randomCode = Math.random().toString(36).substring(0, 6);
  this.sku = `${brand}-${name}-${randomCode}`;
});
export default mongoose.model("Product", productModel);
