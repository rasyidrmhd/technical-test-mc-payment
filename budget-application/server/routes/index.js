const express = require("express");
const router = express.Router();
const user = require("./user");
const transaction = require("./transaction");
const authentication = require("../middlewares/authentication");
const errorHandler = require("../middlewares/errorhandler");

router.use("/", user);
router.use("/transaction", authentication, transaction);
router.use(errorHandler);

module.exports = router;
