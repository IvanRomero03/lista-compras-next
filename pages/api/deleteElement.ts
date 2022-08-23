import { prisma } from "./_db";

import { NextApiRequest, NextApiResponse } from "next";

const deleteElement = async (req: NextApiRequest, res: NextApiResponse) => {
  const { idElement } = req.body;
  if (!idElement) {
    res.status(400).send(undefined);
    return;
  }

  await prisma.listElements.delete({
    where: {
      idElement: idElement,
    },
  });

  res.status(200).send(true);
};

export default deleteElement;
