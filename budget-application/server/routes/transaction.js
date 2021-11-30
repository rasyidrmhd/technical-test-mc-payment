const express = require("express");
const router = express.Router();
const TransactionController = require("../controllers/transactionController");

router.get("/", TransactionController.getTransactions);
router.post("/", TransactionController.postTransaction);
router.get("/:idTransaction", TransactionController.getTransactionById);

module.exports = router;
