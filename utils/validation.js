const validator = require("validator");
const validateData = (req) => {
  const { firstName, lastName, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name cannot be empty");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Not a Strong password");
  }
};

module.exports = {
  validateData,
};
