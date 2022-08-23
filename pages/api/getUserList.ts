import { prisma } from "./_db";
import { NextApiRequest, NextApiResponse } from "next";

const getUserList = async (req: NextApiRequest, res: NextApiResponse) => {
  const { idUser } = req.body;
  if (!idUser) {
    res.status(400).send(undefined);
    return;
  }

  const list = await prisma.listElements.findMany({
    where: {
      userId: {
        equals: idUser as number,
      },
    },
    select: {
      idElement: true,
      name: true,
      description: true,
    },
  });
  res.status(200).send(list);
};

export default getUserList;
