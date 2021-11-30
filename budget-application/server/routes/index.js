const express = require("express");
const router = express.Router();
const user = require("./user");
const authN = require("../middlewares/authentication");
const errorHandler = require("../middlewares/errorhandler");

router.use("/", user);

router.use(errorHandler);

module.exports = router;
