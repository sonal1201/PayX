import { Request, Response } from "express";
import mongoose from "mongoose";
import { Account } from "../models/account-model";

export async function addBalance(req: Request, res: Response) {
    const { amount } = req.body;
    console.log(amount);
    try {
        if (amount < 0) {
            res.status(400).json({
                message: "Amount cannot be negative"
            })
            return;
        }

        const findAccount = await Account.updateOne({ userId: req.userid }, { $inc: { balance: amount } });

        res.status(200).json({
            message: "Amount credited  successfully",
            data: req.userid
        })
    } catch (error) {
        res.status(500).json({
            message: "Invaild network Error",
            data: error
        })
        return;
    }
}

//getBalance
export async function getBalance(req: Request, res: Response) {
    try {
        const account = await Account.findOne({ userId: req.userid });
        console.log(account?.userId);

        if (!account) {
            return res.status(404).json({
                message: "Account not found",
                balance: 0
            });
        }

        return res.status(200).json({
            message: "Balance fetched successfully",
            balance: account.balance
        });
    } catch (error) {
        return res.status(500).json({
            message: "Invalid network Error",
            error
        });
    }
}

//transferBalance
// transferBalance without transactions
export async function transferBalance(req: Request, res: Response) {
    const { amount, to } = req.body;

    try {
        const sender = await Account.findOne({ userId: req.userid });
        console.log(sender.userId)
        const receiver = await Account.findOne({ userId: to });

        if (!sender || sender.balance < amount) {
            return res.status(400).json({ message: "Insufficient balance" });
        }

        if (!receiver) {
            return res.status(400).json({ message: "Invalid account" });
        }

        await Account.updateOne({ userId: req.userid }, { $inc: { balance: -amount } });
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } });

        return res.json({ message: "Transfer successful" });
    } catch (error) {
        return res.status(500).json({ message: "Invalid network Error", data: error });
    }
}
