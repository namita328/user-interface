import axios from "axios";
const BASE_URL = "https://jsonplaceholder.typicode.com";

const api = axios.create({
  baseURL: BASE_URL,
});

export const fetchUsers = async () => {
  try {
    const response = await api.get("/users");
    console.log("api res", response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addUser = async (newUser) => {
  try {
    const response = await api.post("/users", newUser);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editUser = async (userId, editedUser) => {
  try {
    const response = await api.put(`/users/${userId}`, editedUser);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (userId, deleteUser) => {
  try {
    await api.delete(`/users/${userId}`, deleteUser);
  } catch (error) {
    throw error;
  }
};

export default api;
