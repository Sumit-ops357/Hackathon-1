import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/signup", { name, email, password, role });
      alert("Signup successful, please login.");
      navigate("/login");
    } catch (error) {
      alert("Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-2xl font-bold">Signup</h2>
        <input className="block mt-4 p-2 border rounded" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input className="block mt-2 p-2 border rounded" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="block mt-2 p-2 border rounded" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <select className="block mt-2 p-2 border rounded" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>
        <button type="submit" className="mt-4 px-4 py-2 bg-green-500 text-white rounded">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
