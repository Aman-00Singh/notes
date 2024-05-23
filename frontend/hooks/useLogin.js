import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const navigate = useNavigate();
  const login = async (email, password) => {
    const success = handleLogin(email, password);
    if (!success) {
      return;
    }
    try {
      const data = { email, password };
      const response = await axios
        .post("http://localhost:3000/api/login", data)
        .then((response) => {
          if (response.status === 200) {
            console.log("Logged in", response.data);
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
            toast.success("Logged in successfull");
          } else {
            throw new Error(error.message);
          }
        });
    } catch (error) {
      console.log("Error in uselogin", error.message);
      toast.error("Invalid email or password");
    }
  };
  return { login };
};

function handleLogin(email, password) {
  if (!email || !password) {
    toast.error("Plz input all the fields");
    return false;
  }
  return true;
}

export default useLogin;
