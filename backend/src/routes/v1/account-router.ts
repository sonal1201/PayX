import express from "express"
import { addBalance, getBalance, transferBalance } from "../../controllers/account-controller";
import { authMiddleware } from "../../middlewares/auth-middleware";

export const accountRouter = express.Router();

accountRouter.post('/add-balance', authMiddleware, addBalance);
accountRouter.get('/balance', authMiddleware, getBalance);
accountRouter.post('/transfer', authMiddleware, transferBalance);