// Importación correcta
import axios from "axios";

const baseURL = "http://127.0.0.1:3900/api/user/login";

const login = async (email, user_password) => {
  console.log(email, user_password);
  const { data } = await axios.post(baseURL, { email, user_password });
  return data;
};

export default login;
