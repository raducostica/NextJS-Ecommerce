import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/user";
import withConnect from "../../../middleware/database";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, username, password } = req.body;
  const { method } = req;

  console.log(method);

  if (method === "POST") {
    try {
      let newUser = await User.findOne({ email });

      if (newUser)
        return res.status(401).json({ msg: "Username already in use" });

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
      return res.status(401).json({ msg: "Invalid, please Try again" });
    }
  } else {
    res.status(501).json({ msg: "server error" });
  }
};

export default withConnect(handler);
