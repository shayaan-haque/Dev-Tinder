const jwt = require("jsonwebtoken");
const { userModel } = require("../models/users");

const authentication = async (req, res, next) => {
  try {
    const cookie = req.cookies;
    const { token } = cookie;
    if (!token) {
      throw new Error("No Token");
    }
    const decoded = jwt.verify(token, "Shayaan");
    const { _id } = decoded;
    const user = await userModel.findOne({ _id: _id });
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = {
  authentication,
};
