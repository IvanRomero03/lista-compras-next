import { Button, Center, Code, HStack, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import deleteElement from "../apiCalls/deleteElement";
import editElement from "../apiCalls/editElement";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Element = ({ idElement, name, description }) => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);

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
          <Code>{name}</Code>
          <Text
            style={{
              fontWeight: "bold",
            }}
          >
            {description}
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
              name: name,
              description: description,
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
