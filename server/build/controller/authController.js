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
exports.googleCallBack = exports.logout = exports.profileUser = exports.checkTokenVefifyAccount = exports.resetPassword = exports.forgotPassword = exports.refeshToken = exports.login = exports.register = void 0;
const authService_1 = __importDefault(require("../service/authService"));
const responseMessage_1 = require("../utils/responseMessage");
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const user = yield authService_1.default.register(data);
        res.status(200).json({ status: 200, data: user, message: responseMessage_1.authSuc.SUC_1 });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, password } = req.body;
    try {
        const user = yield authService_1.default.login({ userName, password }, res);
        res.status(200).json({ status: 200, data: user, message: responseMessage_1.authSuc.SUC_2 });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.login = login;
const refeshToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const refeshToken = req.cookies.refeshToken;
    try {
        yield authService_1.default.handleRefeshToken(refeshToken, res);
        res.status(200).json({ status: 200, data: [], message: responseMessage_1.authSuc.SUC_3 });
    }
    catch (err) {
        next(err);
    }
});
exports.refeshToken = refeshToken;
const forgotPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        yield authService_1.default.forgotPassword(email);
        res
            .status(200)
            .json({ status: 200, data: null, message: "Send email successs" });
    }
    catch (err) {
        next(err);
    }
});
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, token } = req.params;
    const { newPassword } = req.body;
    try {
        const user = yield authService_1.default.resetPassword(token, userId, newPassword);
        res.status(200).json({ status: 200, data: user, message: responseMessage_1.authSuc.SUC_4 });
    }
    catch (err) {
        next(err);
    }
});
exports.resetPassword = resetPassword;
const checkTokenVefifyAccount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, token } = req.params;
    try {
        const user = yield authService_1.default.checkTokenVerifyEmail(id, token);
        res.status(200).json({ status: 200, data: user, message: responseMessage_1.authSuc.SUC_2 });
    }
    catch (err) {
        next(err);
    }
});
exports.checkTokenVefifyAccount = checkTokenVefifyAccount;
const profileUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield authService_1.default.userProfile(req.user._id);
        res.status(200).json({ status: 200, data: user, message: responseMessage_1.authSuc.SUC_7 });
    }
    catch (err) {
        next(err);
    }
});
exports.profileUser = profileUser;
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
    });
    res.clearCookie("refeshToken", {
        httpOnly: true,
        secure: true,
    });
    res.status(200).json({ status: 200, message: "You have been sign out" });
});
exports.logout = logout;
const googleCallBack = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield authService_1.default.loginGoogleCallback(res, req.user._id);
        res.redirect(`${process.env.FONTEND_HOST}`);
    }
    catch (err) {
        next(err);
    }
});
exports.googleCallBack = googleCallBack;
