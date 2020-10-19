import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
const uri = `mongodb+srv://admin:admin@cluster0.4qkta.mongodb.net/personal?retryWrites=true&w=majority`;

const withConnect = (handler: any) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected...");
  }

  console.log("MongoDB already connected...");

  return handler(req, res);
};

export default withConnect;
