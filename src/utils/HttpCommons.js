import axios from "axios";

const BASE_URL = "https://dev.kalibre.ai/api";  //development server
// export const BASE_URL = "https://app.kalibre.ai/api "; //production server



const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
    Authorization: "Bearer udT8K2aZCEpTtyky7h9yPNnXj7edcvKnMHEVy7GKRQTQga8eHx",
  },
});

export default api;





