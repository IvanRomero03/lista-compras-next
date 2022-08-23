import { prisma } from "./_db";
import { NextApiRequest, NextApiResponse } from "next";

const editElement = async (req: NextApiRequest, res: NextApiResponse) => {
  const { idElement, name, description } = req.body;
  if (!idElement || !name || !description) {
    res.status(400).send(undefined);
    return;
  }

  const element = await prisma.listElements.update({
    where: {
      idElement: idElement,
    },
    data: {
      name,
      description,
    },
  });
  res.status(200).send(element);
};

export default editElement;
