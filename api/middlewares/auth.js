//import modul
const jwt = require("jsonwebtoken");
const moment = require("moment");

//authentication middleware
exports.auth = (req, res, next) => {
  //check the header
  if (!req.headers.authorization) {
    return res.status(403).send({
      status: "error",
      message: "la peticion no tiene la cabecera correspondiente",
    });
  }

  let token = "";
  const authorization = req.headers.authorization;

  if (authorization.toLowerCase().startsWith("bearer")) {
    token = authorization.split(" ")[1];
  }

  try {
    let payload = jwt.verify(token, process.env.SECRET_KEY);
    if (!payload || !payload.id) {
      return res
        .status(401)
        .send({ status: "error", message: "token missing or invalid" });
    }
    if (payload.exp <= moment().unix()) {
      //comprobar expiracion del token
      return res
        .status(401)
        .send({ status: "error", message: "token expired" });
    }
    //add user data a request
    req.user = payload;
  } catch {
    return res.status(404).send({ status: "error", message: "token error" });
  }

  //action
  next();
};
