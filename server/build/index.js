"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
var database_1 = __importDefault(require("./config/database"));
var morgan_1 = __importDefault(require("morgan"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var http_errors_1 = __importDefault(require("http-errors"));
var errMiddleware_1 = __importDefault(require("./middleware/errMiddleware"));
var authRouter_1 = __importDefault(require("./router/authRouter"));
var productRouter_1 = __importDefault(require("./router/productRouter"));
var categoryRouter_1 = __importDefault(require("./router/categoryRouter"));
var brandRouter_1 = __importDefault(require("./router/brandRouter"));
var userRouter_1 = __importDefault(require("./router/userRouter"));
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
dotenv_1.default.config();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/api/auth", authRouter_1.default);
app.use("/api/product", productRouter_1.default);
app.use("/api/category", categoryRouter_1.default);
app.use("/api/brand", brandRouter_1.default);
app.use("/api/user", userRouter_1.default);
//TODO: catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use(errMiddleware_1.default);
app.listen(process.env.PORT || 5000, function () {
    (0, database_1.default)();
    console.log("Server in running on port ".concat(process.env.PORT || 5000));
});
