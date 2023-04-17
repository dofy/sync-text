// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

type BodyData = {
  uuid: string;
  content: string;
};

type ResData = {
  uuid: string;
  content: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResData>
) {
  const { uuid, content } = req.query as BodyData;

  res.status(200).json({
    uuid,
    content: uuidv4(),
  });
}
