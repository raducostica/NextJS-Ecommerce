import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import User from "../../../models/user";
import withConnect from "../../../middleware/database";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = req.body;
  const { method } = req;

  if (method === "POST") {
    try {
      let newUser = await User.findOne({ username });
      if (!newUser)
        return res
          .status(401)
          .json({ msg: "Invalid Username or Password. Please try again" });
      const isMatch = await bcrypt.compare(password, newUser.password);
      if (!isMatch) {
        return res
          .status(401)
          .json({ msg: "Invalid Username or Password. Please try again" });
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
    return res.status(501).json({ msg: "server error" });
  }
};

export default withConnect(handler);
