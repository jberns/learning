import { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
}

export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
  switch (req.method) {
    case "GET":
      res.setHeader('Content-Type', 'application/json')
      res.status(200).json({ name: "fred"});
      break;
    case "POST":
      res.setHeader('Content-Type', 'application/json')
      res.status(200).json({ name: "burger"});
      break;
    default:
    //Do nothing
  }
}