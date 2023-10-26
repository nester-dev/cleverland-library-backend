"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
class AuthGuard {
    execute(req, res, next) {
        if (req === null || req === void 0 ? void 0 : req.userId) {
            return next();
        }
        res.status(401).send({ message: 'not authorized' });
    }
}
exports.AuthGuard = AuthGuard;
