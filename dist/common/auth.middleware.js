"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthMiddleware {
    constructor(secret) {
        this.secret = secret;
    }
    execute(req, res, next) {
        if (req.headers.authorization) {
            const token = req.headers.authorization.replace(/Bearer\s?/, '');
            (0, jsonwebtoken_1.verify)(token, this.secret, (err, payload) => {
                if (err) {
                    return next();
                }
                if (payload && typeof payload !== 'string') {
                    req.userId = payload.userId;
                    next();
                }
            });
        }
        else {
            next();
        }
    }
}
exports.AuthMiddleware = AuthMiddleware;
