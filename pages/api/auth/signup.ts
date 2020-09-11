import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
const User = require("../../../models/user");
import withConnect from "../../../middleware/database";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email, username, password } = req.body;
    const { method } = req;

    if (method === "POST") {
      try {
        let newUser = await User.findOne({ email });

        if (newUser) return res.status(401).json({ msg: "invalid" });

        newUser = new User({
          username,
          email,
          password,
        });

        const salt = await bcrypt.genSalt(10);

        newUser.password = await bcrypt.hash(password, salt);

        await newUser.save();

        res.status(201).json({ msg: "success" });
      } catch (error) {
        console.log(error);
      }
    } else {
      res.status(501).json({ msg: "server error" });
    }
  } else {
    return res.status(501).json({ msg: "server error" });
  }
};

export default withConnect(handler);
