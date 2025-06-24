import axios from "axios";


//  const BaseURL = "http://localhost:8001/api/v1/";
const BaseURL = "https://blblfxn8s7.execute-api.ap-south-1.amazonaws.com/atm/api/v1/";
// const BaseURL = "https://aviar-tracker-api.onrender.com/api/v1/";
// const BaseURL = "https://87d5-103-98-63-72.ngrok-free.app/api/v1/";
const Api = axios.create({
  baseURL: BaseURL,
});

export default Api;
