import axios from "axios";
const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: { "Content-Type": "application/json" },
});

const get = (url, secure = false) => axiosInstance.get(url, { withCredentials: secure });

const post = (url, data, secure = false) =>
  axiosInstance.post(url, data, { withCredentials: secure });

const put = (url, data, secure = false) =>
  axiosInstance.put(url, data, { withCredentials: secure });

const remove = (url, secure = false) => axiosInstance.delete(url, { withCredentials: secure });

export default {
  get,
  post,
  put,
  remove,
};
