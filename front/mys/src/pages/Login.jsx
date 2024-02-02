import React, { useEffect, useState } from "react";
import loginService from "../services/login";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService(email, password);
      setUser(user);
      //Save token LS
      window.localStorage.setItem("loggedMysUser", JSON.stringify(user));
      setEmail("");
      setPassword("");
    } catch (error) {
      setErrorMessage("wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <>
      <section className="h-screen flex pt-44 justify-center">
        <div className="bg-gray-100 flex h-80 ">
          <div className="w-auto h-80 p-4">
            <h1 className="text-center text-3xl font-bold">Mys !</h1>
            <p className="p-10">
              Mys es un prototipo de Red Social para aplicar conocimientos
              aprendidos
            </p>
          </div>
          <form
            className="flex items-center border p-4 flex-col gap-5"
            onSubmit={handleLogin}
          >
            <input
              type="text"
              value={email}
              name="correo"
              placeholder="Correo Electronico "
              onChange={({ target }) => setEmail(target.value)}
            ></input>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            ></input>
            <button className="bg-red-100">Iniciar Sesion</button>
          </form>
        </div>
      </section>
    </>
  );
}
