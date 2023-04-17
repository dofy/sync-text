// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SyncData>
) {
  const { uuid } = req.query;
  const { content } = req.body;

  switch (req.method) {
    case "POST":
      // TODO: Save content to redis
      return res.status(200).json({
        uuid: uuid as string,
        content: content as string,
      });
    case "GET":
    default:
      // TODO: Get / Create content from redis
      return res.status(200).json({
        uuid: uuid as string,
        content: uuidv4(),
      });
  }
}
