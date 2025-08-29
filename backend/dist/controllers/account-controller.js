"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addBalance = addBalance;
exports.getBalance = getBalance;
exports.transferBalance = transferBalance;
const account_model_1 = require("../models/account-model");
async function addBalance(req, res) {
    const { amount } = req.body;
    console.log(amount);
    try {
        if (amount < 0) {
            res.status(400).json({
                message: "Amount cannot be negative"
            });
            return;
        }
        const findAccount = await account_model_1.Account.updateOne({ userId: req.userid }, { $inc: { balance: amount } });
        res.status(200).json({
            message: "Amount credited  successfully",
            data: req.userid
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Invaild network Error",
            data: error
        });
        return;
    }
}
//getBalance
async function getBalance(req, res) {
    try {
        const account = await account_model_1.Account.findOne({ userId: req.userid });
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
    }
    catch (error) {
        return res.status(500).json({
            message: "Invalid network Error",
            error
        });
    }
}
//transferBalance
// transferBalance without transactions
async function transferBalance(req, res) {
    const { amount, to } = req.body;
    try {
        const sender = await account_model_1.Account.findOne({ userId: req.userid });
        console.log(sender?.userId);
        const receiver = await account_model_1.Account.findOne({ userId: to });
        if (!sender || sender.balance < amount) {
            return res.status(400).json({ message: "Insufficient balance" });
        }
        if (!receiver) {
            return res.status(400).json({ message: "Invalid account" });
        }
        await account_model_1.Account.updateOne({ userId: req.userid }, { $inc: { balance: -amount } });
        await account_model_1.Account.updateOne({ userId: to }, { $inc: { balance: amount } });
        return res.json({ message: "Transfer successful" });
    }
    catch (error) {
        return res.status(500).json({ message: "Invalid network Error", data: error });
    }
}
