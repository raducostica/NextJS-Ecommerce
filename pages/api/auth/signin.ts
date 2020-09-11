import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
const User = require("../../../models/user");
import withConnect from "../../../middleware/database";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email, password } = req.body;
    const { method } = req;
    if (method === "POST") {
      try {
        let newUser = await User.findOne({ email });
        if (!newUser) return res.status(401).json({ msg: "invalid" });
        const isMatch = await bcrypt.compare(password, newUser.password);
        if (!isMatch) {
          return res.status(400).json({ msg: "Invalid Credentials" });
        }
        const payload = {
          user: {
            id: newUser.id,
          },
        };
        jwt.sign(
          payload,
          "jwtSecret",
          {
            expiresIn: 360000,
          },
          (err: any, token: any) => {
            if (err) {
              throw err;
            }
            return res.status(201).json({ token });
          }
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      res.status(501).json({ msg: "server error" });
    }
  }
};

export default withConnect(handler);