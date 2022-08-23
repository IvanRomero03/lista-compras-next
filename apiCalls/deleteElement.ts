import client from "./client";

const deleteElement = async (idElement: number) => {
  if (!idElement) {
    return;
  }

  const element = await client.post("/deleteElement", {
    idElement: idElement,
  });
  return element.data;
};

export default deleteElement;
