import {
  Badge,
  Button,
  Code,
  Container,
  Flex,
  Heading,
  HStack,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from "@chakra-ui/react";
import { deleteCookie, getCookie, hasCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { list } from "../types/list";
import Element from "../components/element";
import { Formik, Form, Field } from "formik";
import getUserList from "...";
import createElement from "...";
import deleteElement from "...";

const Home = () => {
  const router = useRouter();
  useEffect(() => {
    if (hasCookie("user")) {
      const user = getCookie("user").toString();
      const name = getCookie("name").toString();
      setIdUser(Number(user));
      setNameUser(name);
    } else {
      router.push("/login");
    }
  }, []);

  const { data, isLoading, isError } = useQuery(
    ["list"],
    async () => await getUserList(Number(getCookie("user").toString()))
  );

  const queryClient = useQueryClient();

  const create = useMutation(
    ["list"],
    async (data: any) => {
      await createElement(data.name, data.description, idUser);
    },
    {
      onSuccess: async () => {
        queryClient.invalidateQueries(["list"]);
      },
    }
  );

  const deleteElem = useMutation(
    ["list"],
    async (data: number) => {
      await deleteElement(data);
    },
    {
      onSuccess: async () => {
        queryClient.invalidateQueries(["list"]);
      },
    }
  );

  const [idUser, setIdUser] = useState(0);
  const [nameUser, setNameUser] = useState("");

  const handleCreateElement = (values) => {
    create.mutate(values);
  };

  const handleDeleteElement = (id: number) => {
    deleteElem.mutate(id);
  };

  return (
    <>
      <Container m="5%" alignItems={"center"} maxW="90%">
        <HStack spacing={4}>
          <Heading> Lista de: {nameUser} </Heading>
          <Menu>
            <MenuButton>
              <Button variant="outline" colorScheme={"blue"}>
                Sign out
              </Button>
            </MenuButton>
            <MenuList>
              <MenuItem
                onClick={() => {
                  deleteCookie("user");
                  deleteCookie("name");
                  router.push("/login");
                }}
              >
                <Text>Sure?</Text>
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Container>
      <Flex justifyContent="center" alignItems="center">
        <VStack spacing={4}>
          <Badge colorScheme="blue">New Element</Badge>
          <Formik
            initialValues={{
              name: "",
              description: "",
            }}
            onSubmit={(values, { resetForm }) => {
              handleCreateElement(values);
              resetForm();
            }}
          >
            <Form>
              <HStack spacing={4}>
                <Field name="name" placeholder="Name" as={Input} />
                <Field
                  name="description"
                  placeholder="Description"
                  as={Input}
                />
                <Button type="submit" colorScheme="blue" variant="outline">
                  Add
                </Button>
              </HStack>
            </Form>
          </Formik>

          <Badge colorScheme="blue">List</Badge>
          {isLoading ? (
            <Text>Loading...</Text>
          ) : isError ? (
            <Text>Error</Text>
          ) : (
            <>
              {data?.map((element) => (
                <Element
                  key={element.idElement}
                  idElement={element.idElement}
                />
              ))}
            </>
          )}
          <></>
        </VStack>
      </Flex>
    </>
  );
};

export default Home;
