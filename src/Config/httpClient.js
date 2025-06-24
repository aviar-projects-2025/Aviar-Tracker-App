import axios from "axios";
import CONSTANTS from "./Constant";

//
const client = axios.create({
  baseURL: CONSTANTS.api.url,
});

const HttpClient = async function(options) {
  const onSuccess = function(response) {
    // console.debug('Request Successful!', response);
    return response.data;
  };

  const onError = function(error) {
    console.error("Request Failed:", error.config);

    if (error.response) {
      // Request was made but server responded with something
      // other than 2xx
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
      console.error("Headers:", error.response.headers);
    } else {
      // Something else happened while setting up the request
      // triggered the error
      console.error("Error Message:", error.message);
    }

    return Promise.reject(error.response || error.message);
  };

  try {
    const response = await client(options);
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
};

export default HttpClient;
