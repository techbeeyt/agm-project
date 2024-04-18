import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SetupAdmin = ({ setAppState }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      const response = await axios.post(config.API_URL + "/auth/register", {
        email,
        password,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setTimeout(() => {
          setAppState("logged_out");
          navigate("/");
        }, 3000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };
  return (
    <div>
      <div className="w-full bg-white shadow-md h-16 flex justify-center items-center text-2xl uppercase text-green-600 font-bold">
        AgM Project
      </div>
      <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
        <div className="flex flex-col justify-start items-start gap-6 p-10 shadow-md rounded-md border border-gray-200">
          <h1 className="text-gray-600 font-semibold text-center w-full text-xl">
            Register Admin
          </h1>
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-[320px]"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-[320px]"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          <button className="btn btn-primary w-[320px]" onClick={handleSubmit}>
            Register Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetupAdmin;
