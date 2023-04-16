import axios from "../config/endpoint";

const login = async (auth:any) => {
  const response = await axios.post('/login', { name: auth.name, pass: auth.pass });
  return response.data;
};

//LOGOUT
const logout = () => {
  localStorage.removeItem('token')
}

const Auth = {
  login,
  logout
}

export default Auth;