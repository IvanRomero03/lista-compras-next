import { prisma } from "./_db";
import { NextApiRequest, NextApiResponse } from "next";

const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name } = req.body;
  const { password } = req.body;

  const user = await prisma.user.create({
    data: {
      name: name as string,
      password: password as string,
    },
  });
  res.status(200).send(user);
};
export default createUser;
