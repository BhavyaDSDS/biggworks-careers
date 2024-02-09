import axios from "axios";

const BASE_URL = "https://dev.kalibre.ai/";  //development server
// export const BASE_URL = "https://api.kalibre.ai/"; //production server



const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
    Authorization: "Bearer udT8K2aZCEpTtyky7h9yPNnXj7edcvKnMHEVy7GKRQTQga8eHx",
  },
});

export default api;





