import axios from "axios";


const request = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  timeout: 7000,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});


export default request;
