"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const createError_1 = __importDefault(require("../utils/createError"));
const validateMongoId = (id) => {
    const isValid = mongoose_1.default.Types.ObjectId.isValid(id);
    if (!isValid) {
        throw (0, createError_1.default)(500, "This is not valid or not Found");
    }
    else {
        return;
    }
};
exports.default = validateMongoId;
