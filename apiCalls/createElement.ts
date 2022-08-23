import client from "./client";

const createElement = async (
  name: string,
  description: string,
  userId: number
) => {
  if (!name || !userId) {
    return;
  }

  const element = await client.post("/createElement", {
    name,
    description,
    userId,
  });
  return element.data;
};

export default createElement;
