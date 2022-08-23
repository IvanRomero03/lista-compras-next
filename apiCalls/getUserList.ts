import client from "./client";

const getUserList = async (idUser: number) => {
  if (!idUser) {
    return [];
  }

  const list = await client.post("/getUserList", {
    idUser: idUser,
  });
  return list.data;
};

export default getUserList;
