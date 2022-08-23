import client from "./client";

const getElement = async (idElement: number) => {
  if (!idElement) {
    return {};
  }
  const element = await client.post("/getElement", {
    idElement: idElement as number,
  });
  return element.data;
};

export default getElement;
