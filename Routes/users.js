const express = require("express");
const router = express.Router();

const {
    loginUsuario,
    registrarUsuario,
    infoUsuario
} = require("../Controllers/usersControllers");

const { runValidation } = require("../Validators/index");

router.post("/users/login", loginUsuario);
router.post("/users/registro", runValidation, registrarUsuario);
router.get("/user/info", infoUsuario)

module.exports = router;