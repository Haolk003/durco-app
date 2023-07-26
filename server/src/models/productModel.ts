import mongoose, { Types } from "mongoose";

interface Sale {
  startDate: Date | null;
  endDate: Date | null;
  discount: number;
}
interface productModelType {
  banner: string;
  imageList: [string];
  make: string;
  model: string;
  year: string;
  engine: string;
  price: number;
  sold: number;
  quanlity: number;
  sale: Sale;
  title: string;
  status: string;
  color: Types.ObjectId;
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
    },
    color: { type: mongoose.Schema.Types.ObjectId, ref: "Color" },
    sale: {
      startDate: {
        type: Date,
        default: new Date(),
      },
      endDate: Date,
      discount: Number,
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
    make: String,
    year: String,
    model: String,
    engine: String,
  },
  { timestamps: true }
);

productModel.pre("save", async function () {
  const name = this.title.toLowerCase().replace(/\s/g, "");
  const brand = this.brand ? this.brand.toLowerCase().replace(/\s/g, "") : "";
  const randomCode = Math.random().toString(36).substring(0, 6);
  this.sku = `${brand}-${name}-${randomCode}`;
});
export default mongoose.model("Product", productModel);
