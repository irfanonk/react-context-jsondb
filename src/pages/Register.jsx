import axios from "axios";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitRegister = async () => {
    const data = {
      id: uuidv4(),
      name,
      email,
      password,
      description: "",
    };
    console.log("onSubmitRegister  data:", data);
    try {
      const response = await axios.post("http://localhost:3004/users", data);
      console.log("onSubmitRegister  response:", response);
      if (response.status === 201) {
        alert("registered");
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
      <label>Name </label>
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
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
      <button className="btn-indigo" onClick={onSubmitRegister}>
        Register
      </button>
    </div>
  );
}
