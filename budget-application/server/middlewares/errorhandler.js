const errorHandler = (err, req, res, next) => {
  switch (err.name) {
    case "SequelizeValidationError":
      const message = err.errors.map((err) => err.message);
      res.status(400).json({ message });
      break;
    case "SequelizeUniqueConstraintError":
      if (err.errors[0].path === "username") {
        res.status(400).json({ message: ["Username already registered"] });
      } else {
        res.status(400).json({ message: ["Email already registered"] });
      }
      break;
    case "loginEmailEmpty":
      res.status(400).json({ message: "Email / username is required" });
      break;
    case "loginPasswordEmpty":
      res.status(400).json({ message: "Password is required" });
      break;
    case "invalidAmount":
      res.status(400).json({ message: ["Amount is invalid"] });
      break;
    case "insufficientBalance":
      res.status(400).json({ message: "Your balance is not enough" });
      break;
    case "invalid":
      res.status(401).json({ message: "Incorrect email / username or password" });
      break;
    case "JsonWebTokenError":
      res.status(401).json({ message: "You must login first" });
      break;
    case "transactionNotFound":
      res.status(404).json({ message: "Transaction not found" });
      break;
    default:
      res.status(500).json({ message: "Internal Server Error" });
      break;
  }
};

module.exports = errorHandler;
