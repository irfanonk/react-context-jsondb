import axios from "axios";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { UserContext } from "../context/UserDataContext";

export default function Login() {
  const userDataCtx = useContext(UserContext);
  const { setUserData } = userDataCtx;

  const navigate = useNavigate();
  const [email, setEmail] = useState("irfan@clarusway.com");
  const [password, setPassword] = useState("test");

  const onSubmitLogin = async () => {
    if (!email || !password) {
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:3004/users?email=${email}`
      );
      console.log("onSubmitRegister  response:", response);
      if (response.status === 200) {
        const user = response.data[0];
        if (user.password !== password) {
          return alert("Wrong creds");
        }
        alert("Login successful");
        localStorage.setItem("activeUser", email);
        setUserData({
          name: user.name,
          email: user.email,
          id: user.id,
          description: user.description,
        });
        navigate("/todo");
      }
    } catch (error) {
      console.log("onSubmitRegister  error:", error);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        width: "50%",
      }}
    >
      <label>Email </label>
      <input
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <label>Password </label>
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button className="btn-indigo" onClick={onSubmitLogin}>
        Login
      </button>
    </div>
  );
}
