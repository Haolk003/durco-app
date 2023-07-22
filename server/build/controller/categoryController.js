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
exports.createCategory = exports.updateCategoryById = exports.getAllCategory = exports.deleteCategoryById = void 0;
const categoryService_1 = __importDefault(require("../service/categoryService"));
const responseMessage_1 = require("../utils/responseMessage");
const createCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, image } = req.body;
    try {
        const category = yield categoryService_1.default.createCategory(name, image);
        res
            .status(200)
            .json({ status: 200, data: category, message: responseMessage_1.categorySuc.SUC_1 });
    }
    catch (err) {
        next(err);
    }
});
exports.createCategory = createCategory;
const getAllCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield categoryService_1.default.getAllCategory();
        res
            .status(200)
            .json({ status: 200, data: categories, message: responseMessage_1.categorySuc.SUC_2 });
    }
    catch (err) {
        next(err);
    }
});
exports.getAllCategory = getAllCategory;
const updateCategoryById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    try {
        const category = yield categoryService_1.default.updateCategoryById(id, data);
        res
            .status(200)
            .json({ status: 200, data: category, message: responseMessage_1.categorySuc.SUC_3 });
    }
    catch (err) {
        next(err);
    }
});
exports.updateCategoryById = updateCategoryById;
const deleteCategoryById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield categoryService_1.default.deleteCategoryById(id);
        res.status(200).json({ status: 200, data: [], message: responseMessage_1.categorySuc.SUC_4 });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteCategoryById = deleteCategoryById;
