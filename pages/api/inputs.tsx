import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const {
    inputTypes,
    minOrNoofChoices,
    focus,
    error,
    inputNames,
    values,
    type,
  } = req.body;

  let data = inputTypes.map((val: any, index: number) => {
    let acc: { [key: string]: any } = {};
    acc["renderType"] = inputTypes[index];
    inputNames && inputNames[index] && (acc["name"] = inputNames[index]);
    acc["value"] = values[index];
    minOrNoofChoices &&
      minOrNoofChoices[index] &&
      (acc["minOrNoofChoices"] = minOrNoofChoices[index]);
    focus !== undefined && typeof focus === "boolean"
      ? (acc["focus"] = focus)
      : focus !== undefined && (acc["focus"] = focus[index]);
    error !== undefined && typeof error === "boolean"
      ? (acc["error"] = error)
      : error !== undefined && (acc["error"] = error[index]);
    acc["type"] = type[index];

    return acc;
  });

  return res.status(201).json({ inputs: data });
};
