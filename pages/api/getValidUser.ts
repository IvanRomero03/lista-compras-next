import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "./_db";
import axios from "axios";

const getValidUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name } = req.body;
  const user = await prisma.user.count({
    where: {
      name: name as string,
    },
  });
  console.log(user);
  if (user === 0) {
    res.status(200).send(true);
  } else {
    res.status(200).send(false);
  }
};

export default getValidUser;
