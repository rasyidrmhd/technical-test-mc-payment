const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const authentication = require("../middlewares/authentication");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/userdata", authentication, UserController.getUserData);

module.exports = router;
