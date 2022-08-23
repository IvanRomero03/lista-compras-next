import { prisma } from "./_db";
import { NextApiRequest, NextApiResponse } from "next";

const getElement = async (req: NextApiRequest, res: NextApiResponse) => {
  const { idElement } = req.body;
  if (!idElement) {
    res.status(400).send(undefined);
    return;
  }

  const element = await prisma.listElements.findFirst({
    where: {
      idElement: Number(idElement) as number,
    },
  });
  res.status(200).send(element);
};

export default getElement;
