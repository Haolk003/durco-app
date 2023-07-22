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
exports.createBrand = exports.updateBrandById = exports.getAllBrand = exports.deleteBrandById = void 0;
const brandService_1 = __importDefault(require("../service/brandService"));
const responseMessage_1 = require("../utils/responseMessage");
const createBrand = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, logo } = req.body;
    try {
        const Brand = yield brandService_1.default.createBrand({ name, logo });
        res.status(200).json({ status: 200, data: Brand, message: responseMessage_1.brandSuc.SUC_1 });
    }
    catch (err) {
        next(err);
    }
});
exports.createBrand = createBrand;
const getAllBrand = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield brandService_1.default.getAllBrand();
        res
            .status(200)
            .json({ status: 200, data: categories, message: responseMessage_1.brandSuc.SUC_2 });
    }
    catch (err) {
        next(err);
    }
});
exports.getAllBrand = getAllBrand;
const updateBrandById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    try {
        const Brand = yield brandService_1.default.updateBrandById(id, data);
        res.status(200).json({ status: 200, data: Brand, message: responseMessage_1.brandSuc.SUC_3 });
    }
    catch (err) {
        next(err);
    }
});
exports.updateBrandById = updateBrandById;
const deleteBrandById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield brandService_1.default.deleteBrandById(id);
        res.status(200).json({ status: 200, data: [], message: responseMessage_1.brandSuc.SUC_4 });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteBrandById = deleteBrandById;
