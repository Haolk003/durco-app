"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var createJwt = function (id, role) {
    try {
        var accessToken = jsonwebtoken_1.default.sign({ _id: id, role: role }, "".concat(process.env.JWT_KEY), { expiresIn: "".concat(process.env.ACCESS_TOKEN_EXPRIES) });
        var refeshToken = jsonwebtoken_1.default.sign({ _id: id, role: role }, "".concat(process.env.JWT_KEY), {
            expiresIn: "".concat(process.env.REFESH_TOKEN_EXPRIES),
        });
        return { accessToken: accessToken, refeshToken: refeshToken };
    }
    catch (err) {
        throw Error(err);
    }
};
exports.default = createJwt;
