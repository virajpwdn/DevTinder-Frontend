import io from "socket.io-client";
import { BASE_URL } from "./constants";
export const createConnection = () => {
    // Log it once and check what is comming in createConnection
  return io(BASE_URL);
};
