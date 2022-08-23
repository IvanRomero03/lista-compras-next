import axios from "axios";

const client = axios.create({
  baseURL: "http://lista-compras-next.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default client;
