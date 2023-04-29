import axios from "axios";

const accessToken = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')).access_token : null;

const request = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  timeout: 7000,
  headers: {
    'Authorization': `Bearer ${accessToken}` ,
  },
});


export default request;
