"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountRouter = void 0;
const express_1 = __importDefault(require("express"));
const account_controller_1 = require("../../controllers/account-controller");
const auth_middleware_1 = require("../../middlewares/auth-middleware");
exports.accountRouter = express_1.default.Router();
exports.accountRouter.post('/add-balance', auth_middleware_1.authMiddleware, account_controller_1.addBalance);
exports.accountRouter.get('/balance', auth_middleware_1.authMiddleware, account_controller_1.getBalance);
exports.accountRouter.post('/transfer', auth_middleware_1.authMiddleware, account_controller_1.transferBalance);
