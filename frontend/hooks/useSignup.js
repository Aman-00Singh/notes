import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useSignup = () => {
  const navigate = useNavigate();
  const signup = async ({ fullname, email, password }) => {
    const success = handleSignup({ fullname, email, password });
    if (!success) {
      return;
    }
    try {
      const data = { fullname, email, password };
      const response = await axios
        .post("http://localhost:3000/api/create-account", data)
        .then((response) => {
          if (response.status === 201) {
            toast.success("Account created successfully");
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
            console.log("Signed up", response.data);
          }
        });
    } catch (error) {
      toast.error("Error in signing up");
      console.log("useSignup error", error.message);
    }
  };
  return { signup };
};

function handleSignup({ fullname, email, password }) {
  if (!fullname || !email || !password) {
    console.log("Error in handleSignup");
    toast.error("Plz input all the fields");
    return false;
  }
  return true;
}

export default useSignup;
