"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var brandController_1 = require("../controller/brandController");
var router = express_1.default.Router();
router.post("/create", brandController_1.createBrand);
router.put("/updateById/:id", brandController_1.updateBrandById);
router.get("/getAllBrand", brandController_1.getAllBrand);
router.delete("/deletebyId/:id", brandController_1.deleteBrandById);
exports.default = router;
