import axios from "axios";

const accessToken = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')).token.access_token : null;

const request = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  timeout: 7000,
  headers: {
    'Authorization': `Bearer ${accessToken}` ,
    "Content-Type": "multipart/form-data",
  },
});


export default request;
