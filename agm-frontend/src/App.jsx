import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import axios from "axios";
import SetupAdmin from "./pages/setup_admin/SetupAdmin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/login/Login";
import Layout from "./components/Layout";
import Data from "./pages/data/Data";

function App() {
  const [appState, setAppState] = useState("init"); // "init" | "no_admin" | "logged_in" | "logged_out"
  useEffect(() => {});

  const navigate = useNavigate();

  useEffect(() => {
    try {
      axios
        .get("http://localhost:3000/api/auth/status", { withCredentials: true })
        .then((res) => {
          setAppState(res.data.status);
        });
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (appState === "no_admin") {
      navigate("/setup_admin");
    }

    if (appState === "logged_out") {
      navigate("/login");
    }

    if (appState === "logged_in") {
      navigate("?");
    }
  }, [appState]);

  if (appState === "init") {
    return (
      <div className="w-[100vw] h-[100vh] bg-white flex justify-center items-center">
        <div className="text-5xl text-green-600 font-bold uppercase animate-pulse">
          AgM Project
        </div>
      </div>
    );
  }

  return (
    <div>
      <ToastContainer />
      {appState === "no_admin" ? (
        <Routes>
          <Route
            path="/setup_admin"
            element={<SetupAdmin setAppState={(value) => setAppState(value)} />}
          />
        </Routes>
      ) : null}

      {appState === "logged_out" ? (
        <Routes>
          <Route
            path="/login"
            element={<Login setAppState={(value) => setAppState(value)} />}
          />
        </Routes>
      ) : null}

      {/** Logged in routes */}
      {appState === "logged_in" ? (
        <Layout>
          <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path="/data" element={<Data />} />
          </Routes>
        </Layout>
      ) : null}
    </div>
  );
}

export default App;
