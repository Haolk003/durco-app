"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var categoryModel = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    parentCategory: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Category" },
});
exports.default = mongoose_1.default.model("Category", categoryModel);
