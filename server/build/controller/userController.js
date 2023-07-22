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
exports.deleteUserById = exports.updateUserById = exports.getUserById = exports.getAllUser = exports.createUser = void 0;
const userService_1 = __importDefault(require("../service/userService"));
const responseMessage_1 = require("../utils/responseMessage");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const newUser = yield userService_1.default.createUser(data);
        res
            .status(200)
            .json({ status: 200, data: newUser, message: responseMessage_1.userSuc.SUC_1 });
    }
    catch (err) {
        next(err);
    }
});
exports.createUser = createUser;
const getAllUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userService_1.default.getAllUser();
        res.status(200).json({ status: 200, data: users, message: responseMessage_1.userSuc.SUC_2 });
    }
    catch (err) {
        next(err);
    }
});
exports.getAllUser = getAllUser;
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield userService_1.default.getUserById(id);
        res
            .status(200)
            .json({ status: 200, data: userService_1.default, message: responseMessage_1.userSuc.SUC_3 });
    }
    catch (err) {
        next(err);
    }
});
exports.getUserById = getUserById;
const updateUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const { id } = req.params;
    try {
        const user = yield userService_1.default.updateUserById(id, data);
        res.status(200).json({ status: 200, data: user, message: responseMessage_1.userSuc.SUC_4 });
    }
    catch (err) {
        next(err);
    }
});
exports.updateUserById = updateUserById;
const deleteUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield userService_1.default.deleteUserById(id);
        res.status(200).json({ status: 200, data: user, message: responseMessage_1.userSuc.SUC_5 });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteUserById = deleteUserById;
