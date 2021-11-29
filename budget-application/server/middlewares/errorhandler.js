const errorHandler = (err, req, res, next) => {
  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      const message = err.errors.map((err) => err.message);
      res.status(400).json({ message });
      break;
    case "loginEmailEmpty":
      res.status(400).json({ message: "Email / username is required" });
      break;
    case "loginPasswordEmpty":
      res.status(400).json({ message: "Password is required" });
      break;
    case "Invalid":
      res.status(401).json({ message: "Incorrect email / username or password" });
      break;
    case "JsonWebTokenError":
      res.status(401).json({ message: "You must login first" });
      break;
    default:
      res.status(500).json({ message: "Internal Server Error" });
      break;
  }
};

module.exports = errorHandler;
