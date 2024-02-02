import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

import "./App.css";

function App() {
  const [loggedMysUser, setLoggedMysUser] = useState(null);

  useEffect(() => {
    // Obtener el usuario y el token del localStorage al cargar la aplicación
    const storedUser = localStorage.getItem("loggedMysUser");
    if (storedUser) {
      setLoggedMysUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home loggedMysUser={loggedMysUser} />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
