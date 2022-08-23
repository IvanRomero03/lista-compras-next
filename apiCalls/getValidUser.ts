import client from "./client";

const getValidUser = async (name: string) => {
  const user = await client.post(`/getValidUser`, { name: name });
  return user.data;
};

export default getValidUser;
