import io from "socket.io-client";
import { BASE_URL } from "./constants";
export const createConnection = () => {
  return io(BASE_URL);
};
