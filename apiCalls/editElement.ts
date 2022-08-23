import client from "./client";

const editElement = async (
  idElement: number,
  name: string,
  description: string
) => {
  if (!idElement || !name || !description) {
    return;
  }

  const element = await client.post("/editElement", {
    idElement: idElement,
    name: name,
    description: description,
  });
  return element.data;
};

export default editElement;
