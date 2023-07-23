"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const createError = (status, message) => {
    const err = (0, http_errors_1.default)(status | 500, message);
    // err.message = message || "SOMETHING WENT WRONG ";
    // err.status = status || 500;
    return err;
};
exports.default = createError;
