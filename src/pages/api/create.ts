// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

type BodyData = {
  uuid: string;
};

type ResData = {
  oldid: string;
  newid: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResData>
) {
  const { uuid } = req.query as BodyData;

  res.status(200).json({
    oldid: uuid,
    newid: uuidv4(),
  });
}
