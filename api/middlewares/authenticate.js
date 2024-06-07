import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";
import { Admin } from "../models/adminModel.js";
import { User } from "../models/userModel.js"; // добавьте модель пользователя

const { JWT_SECRET_KEY } = process.env;

const authenticate = (userType) => {
  return async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      next(HttpError(401));
    }

    try {
      const { id } = jwt.verify(token, JWT_SECRET_KEY);
      let user;
      if (userType === "admin") {
        user = await Admin.findById(id);
      } else if (userType === "user") {
        user = await User.findById(id);
      }
      if (!user || !user.token) {
        next(HttpError(401));
      }

      req.user = user;
      next();
    } catch (error) {
      next(HttpError(401));
    }
  };
};

export default authenticate;
