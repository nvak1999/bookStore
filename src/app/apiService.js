import axios from "axios";
const BACKEND_API = process.env.REACT_APP_BACKEND_API;
const apiService = axios.create({
  baseURL: BACKEND_API,
});
apiService.interceptors.request.use(
  (request) => {
    console.log("start request", request);
    return request;
  },
  function (error) {
    console.log("request error", error);
    return Promise.reject(error);
  }
);
apiService.interceptors.response.use(
  (response) => {
    console.log("start response", response);
    return response;
  },
  function (error) {
    console.log("response error", error);
    return Promise.reject(error);
  }
);
export default apiService;
