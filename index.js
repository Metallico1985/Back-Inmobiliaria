const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const usersRoutes = require("./Routes/users");
const inmueblesRoutes = require("./Routes/inmuebles");


//middlewares
const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


//Endpoints
app.get("/api", (req, res) => {
  res.json({ time: Date() });
});

app.use("/api", usersRoutes);
app.use("./api", inmueblesRoutes);

app.get("/error", (req, res) => {
  res.status(400).json({ error: "Recurso not found" });
});

//Ejecucion del servidor
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
