import React, { useEffect } from "react";
import Publication from "../components/publication";
import publication from "../services/publication";
import { useState } from "react";

export default function Home({ loggedMysUser }) {
  const [text_description, setText_description] = useState("");
  const [file, setFile] = useState(null);
  const [token, setToken] = useState(null);
  const user = loggedMysUser;

  useEffect(() => {
    if (user) {
      setToken(user.token);
    }
  }, []);

  const handlePost = (event) => {
    event.preventDefault();
    console.log(token, text_description, "AAAAAAAAAA");

    const formData = new FormData();
    formData.append("description", text_description);
    formData.append("file0", file);
    publication.save(formData, token);
  };

  return (
    <>
      <h1 className="text-blue-500 text-center m-5">
        Hello There ! Be updated
      </h1>
      <div className="m-10 flex-row text-center items-center content-center ">
        <form className="flex" onSubmit={handlePost}>
          <input
            type="text"
            placeholder="Que estas pensando?"
            value={text_description}
            onChange={({ target }) => setText_description(target.value)}
          ></input>
          <input
            type="file"
            onChange={({ target }) => setFile(target.files[0])}
          ></input>
          <button>Post</button>
        </form>
      </div>
      <Publication></Publication>
    </>
  );
}
