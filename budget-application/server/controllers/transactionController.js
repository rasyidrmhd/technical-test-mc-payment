const { Transaction } = require("../models");

class TransactionController {
  static async getTransactions(req, res, next) {
    try {
      const transactions = await Transaction.findAll();

      res.status(200).json(transactions);
    } catch (err) {
      next(err);
    }
  }

  static async postTransaction(req, res, next) {
    try {
      const { type, amount, category, note, date } = req.body;
      let current_balance = 0;
      let previous_balance = 0;

      const getLastBalance = await Transaction.findAll({
        where: { UserId: req.user.id },
        order: [["id", "DESC"]],
        limit: 1,
      });

      if (getLastBalance[0]) {
        current_balance = getLastBalance[0].current_balance;
        previous_balance = getLastBalance[0].previous_balance;
      }

      if (type === "Expenses") {
        if (previous_balance < Number(amount)) {
          throw { name: "insufficientBalance" };
        } else {
          current_balance -= Number(amount);
        }
      } else {
        current_balance += Number(amount);
      }

      if (amount <= 0) {
        throw { name: "InvalidAmount" };
      }

      const createTransaction = await Transaction.create({
        current_balance,
        previous_balance: getLastBalance[0].current_balance,
        type,
        amount: Number(amount),
        category,
        note,
        date,
        UserId: req.user.id,
      });

      res.status(201).json({ id: createTransaction.id, amount });
    } catch (err) {
      // console.log(err);
      next(err);
    }
  }

  static async getTransactionById(req, res, next) {
    try {
      const { idTransaction } = req.params;

      const transaction = await Transaction.findOne({
        where: {
          id: Number(idTransaction),
          UserId: req.user.id,
        },
        attributes: {
          exclude: ["UserId", "createdAt", "updatedAt"],
        },
      });

      if (!transaction) {
        throw { name: "transactionNotFound" };
      }

      res.status(200).json(transaction);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = TransactionController;
