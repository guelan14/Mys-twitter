import React from "react";

export default function Login() {
  return (
    <>
      <section className="h-screen flex pt-44 justify-center">
        <div className="bg-gray-100 flex h-80 ">
          <div className="w-auto h-80 p-4">
            <h1 className="text-center text-3xl font-bold">Mys !</h1>
            <p className="p-10">
              Mys es un prototipo de Red Social para implementar conocimientos
              aprendidos
            </p>
          </div>
          <form className="flex items-center border p-4 flex-col gap-5">
            <input
              type="text"
              name="correo"
              placeholder="Correo Electronico "
            ></input>
            <input
              type="password"
              name="contraseña"
              placeholder="Password"
            ></input>
            <button className="bg-red-100">Iniciar Sesion</button>
          </form>
        </div>
      </section>
    </>
  );
}
