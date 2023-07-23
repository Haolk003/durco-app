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
const crypto_js_1 = __importDefault(require("crypto-js"));
const userSchema = new mongoose_1.default.Schema({
    userName: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg",
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    googleId: {
        type: String,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    verify: {
        type: Boolean,
        default: false,
    },
    refeshToken: {
        type: String,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
    gender: {
        type: String,
    },
    birth: {
        type: Date,
    },
}, { timestamps: true });
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password")) {
            return next();
        }
        this.password = crypto_js_1.default.AES.encrypt(`${this.password}`, `${process.env.CRYPTO_KEY}`).toString();
    });
});
//TODO:mongoose method
userSchema.method("isPasswordMatched", function isPasswordMatched(enterPassword) {
    const hashedPassword = crypto_js_1.default.AES.decrypt(`${this.password}`, `${process.env.CRYPTO_KEY}`).toString(crypto_js_1.default.enc.Utf8);
    if (hashedPassword === enterPassword.toString()) {
        return true;
    }
    return false;
});
exports.default = mongoose_1.default.model("User", userSchema);
