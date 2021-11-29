const errorHandler = (err, req, res, next) => {
  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      const message = err.errors.map((err) => err.message);
      res.status(400).json({ message });
      break;
    default:
      res.status(500).json({ message: "Internal Server Error" });
      break;
  }
};

module.exports = errorHandler;
