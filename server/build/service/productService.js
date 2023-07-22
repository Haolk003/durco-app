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
const productModel_1 = __importDefault(require("../models/productModel"));
const validateId_1 = __importDefault(require("../validation/validateId"));
const responseMessage_1 = require("../utils/responseMessage");
const createError_1 = __importDefault(require("../utils/createError"));
const createProduct = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield productModel_1.default.create(data);
    return product;
});
const updateProductById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, validateId_1.default)(id);
    const findProduct = yield productModel_1.default.findById(id);
    if (!findProduct) {
        throw (0, createError_1.default)(500, responseMessage_1.productErr.ERR_1);
    }
    const updateProduct = yield productModel_1.default.findByIdAndUpdate(id, data, {
        new: true,
    });
    return updateProduct;
});
const getAllProduct = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield productModel_1.default.find();
    return products;
});
const getProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, validateId_1.default)(id);
    const product = yield productModel_1.default.findById(id);
    if (!product) {
        throw Error(responseMessage_1.productErr.ERR_1);
    }
    return product;
});
const deleteProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, validateId_1.default)(id);
    const findProduct = yield productModel_1.default.findById(id);
    if (!findProduct) {
        throw (0, createError_1.default)(500, responseMessage_1.productErr.ERR_1);
    }
    const product = yield productModel_1.default.findByIdAndDelete(id);
    return;
});
const productService = {
    createProduct,
    getAllProduct,
    getProductById,
    deleteProductById,
    updateProductById,
};
exports.default = productService;
