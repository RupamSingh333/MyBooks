const jwt = require("jsonwebtoken");
const config = require("../config/confg.json");
const User = require("../models/users");

const auth = async (req, res, next) => {
  try {
    if (req.header("Authorization")) {
      const token = req.header("Authorization").replace("Bearer ", "");
      const data = jwt.verify(token, config.secretkey);
      const user = await User.findOne({ _id: data._id });
      // console.log(user);

      if (user) {
        next();
      } else {
        throw new Error();
      }
    } else {
      throw new Error();
    }
  } catch (error) {
    res.status(401).send({ statusCode: 401, message: "Not Authorized !!!" });
  }
};

module.exports = auth;