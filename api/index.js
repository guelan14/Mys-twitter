const connection = require("./database/connection");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

//connection  to db

//creation node server
const app = express();
const port = 3900;

//cors configuration
app.use(cors());

//Transform body data into js object
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//load routes
const UserRoutes = require("./routes/user");
const PublicationRoutes = require("./routes/publication");
app.use("/api/publication", PublicationRoutes);
app.use("/api/user", UserRoutes);

//test routes
app.get("/test", (req, res) => {
  return res.status(200).send({
    status: "succes",
  });
});

//listen http petitions
app.listen(port, () => {
  console.log("Node Api on ", port);
});
