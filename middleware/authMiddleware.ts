import jwt from "jsonwebtoken";
import User from "../models/user";

const authMiddleware = (req: any, res: any, next: any) => {
  // const { authorization } = req.headers;

  // if (!authorization) {
  //   return res.status(401).json({ msg: "You must be logged in" });
  // }

  // // authorization === "Bearer token"
  // const token = authorization.replace("Bearer ", "");

  // jwt.verify(token, "jwtSecret", async (err: any, payload: any) => {
  //   if (err) {
  //     return res.status(401).json({ msg: "You must be logged in" });
  //   }

  //   console.log(payload);

  //   const { userId } = payload;

  //   const person = await User.findById(userId);

  //   req.user = person;
  //   next();
  // });
  console.log("authMiddleware ran");
  next();
};

export default authMiddleware;
