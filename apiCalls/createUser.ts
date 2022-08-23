import client from "./client";

const createUser = async (name: string, password: string) => {
  const user = await client.post(`/createUser`, {
    name: name,
    password: password,
  });
  return user.data;
};

export default createUser;
