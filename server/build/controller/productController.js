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
exports.updateProductById = exports.deleteProductById = exports.getProductById = exports.getAllProduct = exports.createProduct = void 0;
const productService_1 = __importDefault(require("../service/productService"));
const responseMessage_1 = require("../utils/responseMessage");
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield productService_1.default.createProduct(req.body);
        res
            .status(200)
            .json({ status: 200, data: product, message: responseMessage_1.productSuc.SUC_1 });
    }
    catch (err) {
        next(err);
    }
});
exports.createProduct = createProduct;
const getAllProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productService_1.default.getAllProduct();
        res
            .status(200)
            .json({ status: 200, data: products, message: responseMessage_1.productSuc.SUC_2 });
    }
    catch (err) {
        next(err);
    }
});
exports.getAllProduct = getAllProduct;
const getProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const product = yield productService_1.default.getProductById(id);
        res
            .status(200)
            .json({ status: 200, data: product, message: responseMessage_1.productSuc.SUC_3 });
    }
    catch (err) {
        next(err);
    }
});
exports.getProductById = getProductById;
const deleteProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield productService_1.default.deleteProductById(id);
        res.status(200).json({ status: 200, data: [], message: responseMessage_1.productSuc.SUC_4 });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteProductById = deleteProductById;
const updateProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    try {
        const updateProduct = yield productService_1.default.updateProductById(id, data);
        res
            .status(200)
            .json({ status: 200, data: updateProduct, message: responseMessage_1.productSuc.SUC_5 });
    }
    catch (err) {
        next(err);
    }
});
exports.updateProductById = updateProductById;
