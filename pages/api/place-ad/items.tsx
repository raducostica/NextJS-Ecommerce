import { NextApiRequest, NextApiResponse } from "next";
import Product from "../../../models/items";
import withConnect from "../../../middleware/database";
import runMiddleware from "../../../middleware/middlewareHelper";
import authMiddleware from "../../../middleware/authMiddleware";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, description, keywords, price, quantity, user } = req.body;
  const { method } = req;

  if (method === "POST") {
    console.log(await runMiddleware(req, res, authMiddleware));

    try {
      let product = new Product({
        name,
        description,
        keywords,
        price,
        quantity,
        user,
      });

      await product.save();

      return res.status(201).json({ msg: "success" });
    } catch (error) {
      console.log(error);
      return res.status(401).json({ msg: "server error" });
    }
  }
};

export default withConnect(handler);
