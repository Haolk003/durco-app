"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errMiddleware = (err, req, res, next) => {
    const errStatus = err.status || 500;
    const errMessage = err.message || "something went wrong";
    return res.status(errStatus).json({
        success: false,
        message: errMessage,
        status: errStatus,
        stack: err.stack,
    });
};
exports.default = errMiddleware;
