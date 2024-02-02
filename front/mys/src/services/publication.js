import axios from "axios";

const baseURL = "http://127.0.0.1:3900/api/publication/post";

const save = async (formData, token) => {
  console.log(formData, token);

  if (token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const response = await axios.post(baseURL, formData, config);
      console.log(response.data);
      // Realiza acciones adicionales después de la publicación
    } catch (error) {
      console.error("Error al publicar:", error);
      // Manejar el error según sea necesario
    }
  }
};

const getFeed = async () => {
  const config = {
    headers: {
      Authorization: "Bearer ${token}",
    },
  };
  const { data } = await axios.get(baseURL + "/list", {
    email,
    user_password,
  });
  return data;
};

export default { getFeed, save };
