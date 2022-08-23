import { prisma } from "./_db";
import { NextApiRequest, NextApiResponse } from "next";

const authUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name } = req.body;
  const { password } = req.body;
  if (!name || !password) {
    res.status(400).send(undefined);
    return;
  }
  const user = await prisma.user.findMany({
    where: {
      name: {
        equals: name as string,
      },
      password: {
        equals: password as string,
      },
    },
    select: {
      idUser: true,
      name: true,
    },
  });
  res.status(200).send(user);
};
export default authUser;
