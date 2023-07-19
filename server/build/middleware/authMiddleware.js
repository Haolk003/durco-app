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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAdmin = exports.verifyUser = exports.verifyToken = void 0;
var cookie_1 = __importDefault(require("cookie"));
var lodash_1 = require("lodash");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var userModel_1 = __importDefault(require("../models/userModel"));
var createError_1 = __importDefault(require("../utils/createError"));
var verifyToken = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var token, options;
    var _a;
    return __generator(this, function (_b) {
        token = cookie_1.default.parse(((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken) || "");
        options = {
            algorithms: ["HS256"], // Specify the expected algorithm used for signing the token
        };
        try {
            console.log(req.cookies.accessToken);
            if ((0, lodash_1.isEmpty)(token)) {
                throw (0, createError_1.default)(401, "Not author token expried,Please login again");
            }
            jsonwebtoken_1.default.verify(token, "".concat(process.env.JWT_KEY), options, function (err, decoded) { return __awaiter(void 0, void 0, void 0, function () {
                var user, findUser;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (err) {
                                throw (0, createError_1.default)(401, "Failed to retrieve user information");
                            }
                            user = decoded;
                            return [4 /*yield*/, userModel_1.default.findOne({
                                    _id: user._id,
                                    role: user.role,
                                })];
                        case 1:
                            findUser = _a.sent();
                            if (!findUser) {
                                throw (0, createError_1.default)(401, "Failed to retrieve user information");
                            }
                            req.user = user;
                            next();
                            return [2 /*return*/];
                    }
                });
            }); });
        }
        catch (err) {
            next(err);
        }
        return [2 /*return*/];
    });
}); };
exports.verifyToken = verifyToken;
var verifyUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            (0, exports.verifyToken)(req, res, function (err) {
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
        return [2 /*return*/];
    });
}); };
exports.verifyUser = verifyUser;
var checkAdmin = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            (0, exports.verifyToken)(req, res, function (err) {
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
        return [2 /*return*/];
    });
}); };
exports.checkAdmin = checkAdmin;
