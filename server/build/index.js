"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const database_1 = __importDefault(require("./config/database"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_errors_1 = __importDefault(require("http-errors"));
const errMiddleware_1 = __importDefault(require("./middleware/errMiddleware"));
const authRouter_1 = __importDefault(require("./router/authRouter"));
const productRouter_1 = __importDefault(require("./router/productRouter"));
const categoryRouter_1 = __importDefault(require("./router/categoryRouter"));
const brandRouter_1 = __importDefault(require("./router/brandRouter"));
const userRouter_1 = __importDefault(require("./router/userRouter"));
const couponRouter_1 = __importDefault(require("./router/couponRouter"));
const cartRouter_1 = __importDefault(require("./router/cartRouter"));
require("./config/passport");
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, cors_1.default)({ credentials: true, origin: [`${process.env.FONTEND_HOST}`] }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/api/auth", authRouter_1.default);
app.use("/api/product", productRouter_1.default);
app.use("/api/category", categoryRouter_1.default);
app.use("/api/brand", brandRouter_1.default);
app.use("/api/user", userRouter_1.default);
app.use("/api/coupon", couponRouter_1.default);
app.use("/api/cart", cartRouter_1.default);
//TODO: catch 404 and forward to error handler
app.use((req, res, next) => {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use(errMiddleware_1.default);
app.listen(process.env.PORT || 5000, () => {
    (0, database_1.default)();
    console.log(`Server in running on port ${process.env.PORT || 5000}`);
});
