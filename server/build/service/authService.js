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
const cookie_1 = __importDefault(require("cookie"));
const crypto_js_1 = __importDefault(require("crypto-js"));
const userModel_1 = __importDefault(require("../models/userModel"));
const cartModel_1 = __importDefault(require("../models/cartModel"));
const tokenModel_1 = __importDefault(require("../models/tokenModel"));
const responseMessage_1 = require("../utils/responseMessage");
const createError_1 = __importDefault(require("../utils/createError"));
const createToken_1 = __importDefault(require("../utils/createToken"));
const checkToken_1 = __importDefault(require("../utils/checkToken"));
const sendEmail_1 = __importDefault(require("../utils/sendEmail"));
const validateId_1 = __importDefault(require("../validation/validateId"));
const register = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const checkUser = yield userModel_1.default.findOne({ userName: data.userName });
    if (checkUser) {
        throw (0, createError_1.default)(401, "username already exists");
    }
    const checkEmail = yield userModel_1.default.findOne({ email: data.email });
    if (checkEmail) {
        throw (0, createError_1.default)(401, "Email already exists");
    }
    const newUser = yield userModel_1.default.create(data);
    const newToken = yield tokenModel_1.default.create({
        token: crypto_js_1.default.lib.WordArray.random(64).toString(),
        userId: newUser._id,
    });
    const url = `${process.env.FRONTEND_HOST}/auth/verified/${newUser._id}/${newToken.token}`;
    yield (0, sendEmail_1.default)({
        to: newUser.email,
        content: url,
        subject: "Verify Account",
    });
    return newUser;
});
const login = (data, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findOne({ userName: data.userName });
    if (!user) {
        throw (0, createError_1.default)(400, responseMessage_1.authError.ERR_1);
    }
    if (!user.isPasswordMatched(data.password)) {
        throw (0, createError_1.default)(400, responseMessage_1.authError.ERR_2);
    }
    const { accessToken, refeshToken } = yield (0, createToken_1.default)(`${user._id.toString()}`, user.role);
    const updateRefeshToken = yield userModel_1.default.findByIdAndUpdate(user._id, { refeshToken: refeshToken }, { new: true });
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: Date.now() + 60 * 60,
    });
    res.cookie("refeshToken", refeshToken, {
        httpOnly: true,
        maxAge: Date.now(),
    });
    return updateRefeshToken;
});
const handleRefeshToken = (refeshToken, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!refeshToken) {
        throw (0, createError_1.default)(400, responseMessage_1.authError.ERR_3);
    }
    const findUser = yield userModel_1.default.findOne({ refeshToken: refeshToken });
    if (!findUser)
        throw (0, createError_1.default)(400, responseMessage_1.authError.ERR_4);
    const user = yield (0, checkToken_1.default)(refeshToken);
    const { accessToken } = (0, createToken_1.default)(findUser._id.toString(), findUser.role);
    res.setHeader("Set-Cookie", cookie_1.default.serialize("access-token", accessToken));
    return;
});
const forgotPassword = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const checkEmail = yield userModel_1.default.findOne({ email });
    if (!checkEmail) {
        throw (0, createError_1.default)(400, "Email is not exists");
    }
    const checkToken = yield tokenModel_1.default.findOne({ userId: checkEmail._id });
    if (checkToken) {
        yield tokenModel_1.default.findByIdAndDelete(checkToken._id);
    }
    const token = yield tokenModel_1.default.create({
        token: crypto_js_1.default.lib.WordArray.random(64).toString(),
        userId: checkEmail._id,
    });
    yield (0, sendEmail_1.default)({
        to: email,
        subject: "Test",
        content: `${checkEmail._id}/${token.token}`,
    });
    return;
});
const resetPassword = (token, userId, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const checkToken = yield tokenModel_1.default.findOne({ token, userId });
    if (!checkToken) {
        throw (0, createError_1.default)(401, responseMessage_1.authError.ERR_6);
    }
    const updatePassword = yield tokenModel_1.default.findByIdAndUpdate(userId, { password: newPassword }, { new: true });
    yield tokenModel_1.default.deleteOne({ _id: checkToken._id });
    return updatePassword;
});
const checkTokenVerifyEmail = (userId, token) => __awaiter(void 0, void 0, void 0, function* () {
    (0, validateId_1.default)(userId);
    const findToken = yield tokenModel_1.default.findOne({ userId: userId, token: token });
    if (!findToken) {
        throw (0, createError_1.default)(400, responseMessage_1.authError.ERR_7);
    }
    const updateUser = yield userModel_1.default.findByIdAndUpdate(userId, { verify: true }, { new: true });
    if (!updateUser) {
        throw (0, createError_1.default)(400, responseMessage_1.authError.ERR_7);
    }
    yield cartModel_1.default.create({ orderBy: userId });
    yield tokenModel_1.default.deleteOne({ _id: findToken._id });
    return updateUser;
});
const userService = {
    register,
    login,
    handleRefeshToken,
    forgotPassword,
    resetPassword,
    checkTokenVerifyEmail,
};
exports.default = userService;
