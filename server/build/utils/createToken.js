"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createJwt = (id, role) => {
    try {
        const accessToken = jsonwebtoken_1.default.sign({ _id: id, role: role }, `${process.env.JWT_KEY}`, { expiresIn: `${process.env.ACCESS_TOKEN_EXPRIES}` });
        const refeshToken = jsonwebtoken_1.default.sign({ _id: id, role }, `${process.env.JWT_KEY}`, {
            expiresIn: `${process.env.REFESH_TOKEN_EXPRIES}`,
        });
        return { accessToken, refeshToken };
    }
    catch (err) {
        throw Error(err);
    }
};
exports.default = createJwt;
