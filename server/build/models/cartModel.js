"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const cartModel = new mongoose_1.default.Schema({
    products: [
        {
            product: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                required: true,
                ref: "Product",
            },
            count: { type: Number, default: 1 },
            color: { type: String },
        },
    ],
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
exports.default = mongoose_1.default.model("Cart", cartModel);
