"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errMiddleware = function (err, req, res, next) {
    var errStatus = err.status || 500;
    var errMessage = err.message || "something went wrong";
    return res.status(errStatus).json({
        success: false,
        message: errMessage,
        status: errStatus,
        stack: err.stack,
    });
};
exports.default = errMiddleware;
