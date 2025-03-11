import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; // Change this if backend URL differs

// Register a new user
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Signup failed.";
  }
};

// Login user
export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Login failed.";
  }
};

// Logout user (Clear local storage)
export const logout = () => {
  localStorage.removeItem("user");
};

// Get current user from local storage
export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
