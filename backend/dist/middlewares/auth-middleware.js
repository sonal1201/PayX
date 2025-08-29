"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    try {
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Authorization token missing or invalid",
            });
        }
        const token = authHeader.split(" ")[1]; // Extract token after 'Bearer'
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.userid = decoded.id; // ✅ attach id from JWT payload
        next();
    }
    catch (error) {
        console.error("Auth Middleware Error:", error);
        return res.status(401).json({
            message: "Invalid or expired token",
        });
    }
}
