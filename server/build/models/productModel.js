"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productModel = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
    },
}, { timestamps: true });
productModel.pre("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const name = this.title.toLowerCase().replace(/\s/g, "");
        const brand = this.brand.toLowerCase().replace(/\s/g, "");
        const randomCode = Math.random().toString(36).substring(0, 6);
        this.sku = `${brand}-${name}-${randomCode}`;
    });
});
exports.default = mongoose_1.default.model("Product", productModel);
