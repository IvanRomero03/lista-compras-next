import React, { useEffect, useState } from "react";
import {
  Code,
  Container,
  Input,
  Button,
  Divider,
  VStack,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import authUser from "../apiCalls/authUser";
import createUser from "../apiCalls/createUser";
import getValidUser from "../apiCalls/getValidUser";

const Login = () => {
  const router = useRouter();
  const handleSubmitLogIn = async (values) => {
    const { user, password } = values;
    const userResponse = await authUser(user, password);
    console.log(userResponse);
    if (userResponse.length != 0) {
      setCookie("user", userResponse[0].idUser);
      setCookie("name", userResponse[0].name);
      router.push("/");
    } else {
      alert("Invalid credentials");
    }
  };
  const handleSubmitRegister = async (values) => {
    const { user, password } = values;
    const response = await getValidUser(user);
    if (!response) {
      alert("name already exists");
    } else {
      const userResponse = await createUser(user, password);
      if (userResponse) {
        setCookie("user", userResponse.idUser);
        setCookie("name", userResponse.name);
        //router.push("/");
      } else {
        alert("Invalid input");
      }
    }
  };
  return (
    <>
      <Container size={"lg"} mt="5%">
        <Formik
          initialValues={{
            user: "",
            password: "",
          }}
          onSubmit={(values) => {
            handleSubmitLogIn(values);
          }}
        >
          <Form>
            <VStack spacing={4}>
              <Code>Usuario</Code>
              <Field
                name="user"
                placeholder="Usuario"
                as={Input}
                type="text"
                variant="flushed"
                size="lg"
                style={{
                  fontWeight: "bold",
                }}
                borderRadius="lg"
                required
              />
              <Code>Contraseña</Code>
              <Field
                name="password"
                placeholder="Contraseña"
                as={Input}
                borderRadius="lg"
                type="password"
                variant="flushed"
                size="lg"
                style={{
                  fontWeight: "bold",
                }}
                required
              />
              <Button
                type="submit"
                colorScheme="teal"
                variant="solid"
                size="lg"
                style={{
                  fontWeight: "bold",
                }}
              >
                Iniciar Sesión
              </Button>
            </VStack>
          </Form>
        </Formik>
        <Divider m="5%" />
        <Formik
          initialValues={{
            user: "",
            password: "",
          }}
          onSubmit={(values) => {
            handleSubmitRegister(values);
          }}
        >
          <Form>
            <VStack spacing={4}>
              <Code>Usuario</Code>
              <Field
                name="user"
                placeholder="Usuario"
                as={Input}
                borderRadius="lg"
                type="text"
                variant="flushed"
                size="lg"
                style={{
                  fontWeight: "bold",
                }}
                required
              />
              <Code>Contraseña</Code>
              <Field
                name="password"
                placeholder="Contraseña"
                as={Input}
                borderRadius="lg"
                type="password"
                variant="flushed"
                size="lg"
                style={{
                  fontWeight: "bold",
                }}
                required
              />
              <Button
                type="submit"
                colorScheme="teal"
                variant="solid"
                size="lg"
                style={{
                  fontWeight: "bold",
                }}
              >
                Registrar
              </Button>
            </VStack>
          </Form>
        </Formik>
      </Container>
    </>
  );
};

export default Login;
