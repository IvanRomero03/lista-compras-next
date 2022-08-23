import client from "./client";

const authUser = async (name: string, password: string) => {
  const user = await client.post(`/authUser`, {
    name: name,
    password: password,
  });
  return user.data;
};

export default authUser;
