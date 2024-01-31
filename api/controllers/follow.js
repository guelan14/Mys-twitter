const pool = require("../database/connection");
const mysql2 = require("mysql2");

const save = async (req, res) => {
  //using user from token
  const user = req.user.id;
  const { userToFollow } = req.body;
  console.log(userToFollow);
  console.log(user);
  //COMPROBAR QUE NO SE CREEN MAS DE DOS FOLLOW AL MISMO

  try {
    //check if follow already exists
    const [alreadyFollow] = await pool.query(
      "SELECT * FROM follow WHERE user_follower = ? AND user_following = ?",
      [user, userToFollow]
    );
    console.log(alreadyFollow);
    if (alreadyFollow && alreadyFollow.length > 0) {
      return res.status(409).send({
        status: "error",
        message: "Follow already exists",
      });
    }

    //check user exists
    const [result] = await pool.query("SELECT * FROM users WHERE user_id=?", [
      userToFollow,
    ]);

    if (result.length > 0 && user != userToFollow) {
      //Insert into db
      await pool.query(
        "INSERT INTO follow (user_follower, user_following) VALUES (? , ?)",
        [user, userToFollow]
      );

      return res.status(200).send({
        status: "succes",
        message: "Creado desde follow",
      });
    }
  } catch (error) {
    return res.status(200).send({
      status: "error",
      message: "Error en la consulta de la db",
    });
  }
  return res.status(200).send({
    status: "error",
    message: "Error al seguir al usuario",
  });
};

module.exports = { save };
