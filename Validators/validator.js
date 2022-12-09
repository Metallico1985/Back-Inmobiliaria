const { check } = require("express-validator");

exports.registroUsuarioValidator = [
    check("nombre")
        .isEmpty()
        .isString()
        .withMessage("Ingrese un nombre"),
    check("apellido")
        .isEmpty()
        .isString(),
    check("password")
        .not()
        .isEmpty(),
    check("email")
        .isEmail()
        .withMessage("Ingrese un correo valido"),

];