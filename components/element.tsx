import { Button, Center, Code, HStack, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { element } from "../types/list";
import getElement from "...";
import deleteElement from "...";
import editElement from "...";

type response = {
  data: element;
  isLoading: boolean;
  isError: boolean;
};

const Element = ({ idElement }) => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);

  const { data, isLoading, isError }: response = useQuery(
    ["element" + idElement],
    async () => await getElement(idElement)
  );

  const deleteMutation = useMutation(
    ["list"],
    async (data) => {
      await deleteElement(idElement);
    },
    {
      onSuccess: async () => {
        queryClient.invalidateQueries(["list"]);
      },
    }
  );

  const handleDeleteElement = async () => {
    deleteMutation.mutate();
  };

  const editMutation = useMutation(
    ["list"],
    async (values: any) => {
      await editElement(idElement, values.name, values.description);
    },
    {
      onSuccess: async () => {
        queryClient.invalidateQueries(["list"]);
        queryClient.invalidateQueries(["element" + idElement]);
      },
    }
  );

  const handleEditElement = async (values) => {
    setIsEditing(false);
    editMutation.mutate(values);
  };

  return (
    <>
      {!isEditing ? (
        <HStack spacing={4}>
          <Code>{data?.name ?? "Loading..."}</Code>
          <Text
            style={{
              fontWeight: "bold",
            }}
          >
            {data?.description ?? "Loading..."}
          </Text>
          <Button
            variant="outline"
            colorScheme={"red"}
            onClick={() => {
              handleDeleteElement();
            }}
          >
            Delete
          </Button>
          <Button
            variant="outline"
            colorScheme={"green"}
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Edit
          </Button>
        </HStack>
      ) : (
        <HStack spacing={4}>
          <Formik
            initialValues={{
              name: data.name,
              description: data.description,
            }}
            onSubmit={(values) => {
              handleEditElement(values);
              console.log(values);
            }}
          >
            <Form>
              <Center>
                <Field name="name" as={Input} w="min" />
                <Field name="description" as={Input} w="min" />
                <Button type="submit" variant="outline" colorScheme={"blue"}>
                  Save
                </Button>
              </Center>
            </Form>
          </Formik>
        </HStack>
      )}
    </>
  );
};

export default Element;
