import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userData = await login({ email, password });
      dispatch(setUser(userData));
      navigate("/dashboard");
    } catch (error) {
      alert(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      dispatch(loginSuccess(res.data));
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-2xl font-bold">Login</h2>
        <input className="block mt-4 p-2 border rounded" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="block mt-2 p-2 border rounded" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Login</button>
      </form>
    </div>
  );
};

export default Login;
