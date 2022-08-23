import { prisma } from "./_db";
import { NextApiRequest, NextApiResponse } from "next";

const createElement = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, description, userId } = req.body;
  if (!name || !userId) {
    res.status(400).send(undefined);
    return;
  }

  const element = await prisma.listElements.create({
    data: {
      name,
      description,
      userId,
    },
  });
  res.status(200).send(element);
};

export default createElement;
