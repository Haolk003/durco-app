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
const brandModel_1 = __importDefault(require("../models/brandModel"));
const responseMessage_1 = require("../utils/responseMessage");
const createError_1 = __importDefault(require("../utils/createError"));
const validateId_1 = __importDefault(require("../validation/validateId"));
const createBrand = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const newBrand = yield brandModel_1.default.create(data);
    return newBrand;
});
const getAllBrand = () => __awaiter(void 0, void 0, void 0, function* () {
    const brands = yield brandModel_1.default.find();
    return brands;
});
const updateBrandById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    (0, validateId_1.default)(id);
    const findBrand = yield brandModel_1.default.findById(id);
    if (!findBrand) {
        throw (0, createError_1.default)(400, responseMessage_1.brandErr.ERR_2);
    }
    const brand = yield brandModel_1.default.findByIdAndUpdate(id, data);
    return brand;
});
const deleteBrandById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    (0, validateId_1.default)(id);
    const brand = yield brandModel_1.default.findByIdAndDelete(id);
    if (!brand) {
        throw (0, createError_1.default)(400, responseMessage_1.brandErr.ERR_3);
    }
    return;
});
const brandService = {
    updateBrandById,
    createBrand,
    deleteBrandById,
    getAllBrand,
};
exports.default = brandService;
