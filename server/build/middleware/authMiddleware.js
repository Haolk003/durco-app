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
exports.checkAdmin = exports.verifyUser = exports.verifyToken = void 0;
const lodash_1 = require("lodash");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const createError_1 = __importDefault(require("../utils/createError"));
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.accessToken;
    const options = {
        algorithms: ["HS256"], // Specify the expected algorithm used for signing the token
    };
    try {
        if ((0, lodash_1.isEmpty)(token)) {
            throw (0, createError_1.default)(401, "Not author token expried,Please login again");
        }
        jsonwebtoken_1.default.verify(token, `${process.env.JWT_KEY}`, options, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                throw (0, createError_1.default)(401, "Failed to retrieve user information");
            }
            const user = decoded;
            const findUser = yield userModel_1.default.findOne({
                _id: user._id,
                role: user.role,
            });
            if (!findUser) {
                throw (0, createError_1.default)(401, "Failed to retrieve user information");
            }
            req.user = user;
            next();
        }));
    }
    catch (err) {
        res.status(401).json({ tokenExpries: true });
        next(err);
    }
});
exports.verifyToken = verifyToken;
const verifyUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, exports.verifyToken)(req, res, (err) => {
            if (err) {
                return next(err);
            }
            if (req.params.id !== req.user._id) {
                throw (0, createError_1.default)(401, "Not authoried!");
            }
            else {
                next();
            }
        });
    }
    catch (err) {
        next(err);
    }
});
exports.verifyUser = verifyUser;
const checkAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, exports.verifyToken)(req, res, (err) => {
            if (err) {
                return next(err);
            }
            if (req.user.role !== "admin") {
                throw (0, createError_1.default)(401, "You are not admin");
            }
            else {
                next();
            }
        });
    }
    catch (err) {
        next(err);
    }
});
exports.checkAdmin = checkAdmin;
