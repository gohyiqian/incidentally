import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const requireAuth = (req, res, next) => {
  // get token from cookies
  // const token = req.cookies.jwt;
  // check if token exists && isValid
  // jwt.verify(token, jwtsecret, decodedToken)
};

export default requireAuth;
