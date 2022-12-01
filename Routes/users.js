const express = require("express");
const router = express.Router();

const {
    loginUsuario,
    registrarUsuario
} = require("../Controllers/usersControllers");

const { runValidator } = require("../Validators/index");

router.post("users/login", runValidator, loginUsuario);
router.post("users/registro", runValidator, registrarUsuario);

module.exports = router;