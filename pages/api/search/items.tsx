import { NextApiRequest, NextApiResponse } from "next";
import Product from "../../../models/items";
import withConnect from "../../../middleware/database";
import runMiddleware from "../../../middleware/middlewareHelper";
import authMiddleware from "../../../middleware/authMiddleware";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  const { value } = req.query;

  if (method === "GET") {
    try {
      const products = await Product.find({
        name: { $regex: value, $options: "i" },
      });

      return res.status(201).json({ products });
    } catch (error) {
      console.log(error);
      return res.status(401).json({ msg: "server error" });
    }
  }
};

export default withConnect(handler);
