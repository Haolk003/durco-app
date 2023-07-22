"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const OrderModel = new mongoose_1.default.Schema({
    products: [
        {
            product: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Product" },
            count: Number,
            color: String,
        },
    ],
    paymentIntent: {},
    address: { type: String, required: true },
    phone: { type: String, required: true },
    orderBy: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
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
}, { timestamps: true });
exports.default = mongoose_1.default.model("Order", OrderModel);
