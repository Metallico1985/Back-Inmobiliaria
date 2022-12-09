const express = require("express");
const router = express.Router();

const {
    loginUsuario,
    registrarUsuario,
    infoUsuario
} = require("../Controllers/usersControllers");
const { verifyToken } = require("../Validators/auth");

const { runValidation } = require("../Validators/index");

router.post("/users/login", loginUsuario);
router.post("/users/registro", runValidation, registrarUsuario);
router.get("/user/info", verifyToken, infoUsuario)

module.exports = router;