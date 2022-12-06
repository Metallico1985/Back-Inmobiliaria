const express = require("express");
const router = express.Router();

const {
    loginUsuario,
    registrarUsuario
} = require("../Controllers/usersControllers");

const { runValidation } = require("../Validators/index");

router.post("/users/login", loginUsuario);
router.post("/users/registro", runValidation, registrarUsuario);

module.exports = router;