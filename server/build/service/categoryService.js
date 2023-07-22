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
const categoryModel_1 = __importDefault(require("../models/categoryModel"));
const createError_1 = __importDefault(require("../utils/createError"));
const responseMessage_1 = require("../utils/responseMessage");
const validateId_1 = __importDefault(require("../validation/validateId"));
const createCategory = (name, image) => __awaiter(void 0, void 0, void 0, function* () {
    const newCategory = yield categoryModel_1.default.create({ name, image });
    return newCategory;
});
const getAllCategory = () => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield categoryModel_1.default.find();
    return categories;
});
const updateCategoryById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, validateId_1.default)(id);
    const findCategory = yield categoryModel_1.default.findById(id);
    if (!findCategory) {
        throw (0, createError_1.default)(500, responseMessage_1.categoryErr.ERR_2);
    }
    const updateCategory = yield categoryModel_1.default.findByIdAndUpdate(id, data, {
        new: true,
    });
    return updateCategory;
});
const deleteCategoryById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, validateId_1.default)(id);
    const findCategory = yield categoryModel_1.default.findById(id);
    if (!findCategory) {
        throw (0, createError_1.default)(400, responseMessage_1.categorySuc.SUC_4);
    }
    yield categoryModel_1.default.findByIdAndDelete(id);
    return;
});
const categoryService = {
    createCategory,
    deleteCategoryById,
    updateCategoryById,
    getAllCategory,
};
exports.default = categoryService;
