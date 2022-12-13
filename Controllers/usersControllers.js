const knex = require("../Config/bd");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.infoUsuario = async (req, res) => {
    res.json(req.user)
}

exports.registrarUsuario = async (req, res) => {
    const { email, password, nombre, apellido, tipo_usuario } = req.body;

    const salt = await bcrypt.genSalt(10);
    const passwordEncrypt = await bcrypt.hash(password, salt);

    knex("usuarios")
        .where({ email: email })
        .then((resultado) => {
            if (resultado.length) {
                res.status(400).json({ error: "El email ya esta siendo utilizado" });
                return;
            }
            knex("usuarios")
                .insert({ email: email, password: passwordEncrypt, nombre: nombre, apellido: apellido, tipo_usuario: tipo_usuario })
                .then(() => {
                    res.json({
                        success: true,
                        mensaje: "El usuario se ha registrado correctamente",
                    });
                })
                .catch((error) => {
                    res.status(400).json({ error: error.message });
                });
        })
        .catch((error) => {
            res.status(400).json({ error: error.message });
        });
};

exports.loginUsuario = (req, res) => {
    const { email, password } = req.body;
    console.log(email, password)
    knex("usuarios")
        .where({ email: email })
        .then(async (resultado) => {
            if (!resultado.length) {
                res.status(404).json({
                    error: "Email y/o contraseña incorrecta/s",

                });
                return;
            }
            const validatePassword = await bcrypt.compare(
                password,
                resultado[0].password
            );
            if (!validatePassword) {
                res.status(404).json({
                    error: "Email y/o contraseña incorrecta/s",
                });
                return;
            }
            const token = jwt.sign(
                {
                    id: resultado[0].id,
                    nombre: resultado[0].nombre,
                    apellido: resultado[0].apellido,
                    email: resultado[0].email,
                    tipo_usuario: resultado[0].tipo_usuario
                },
                process.env.TOKEN_SECRET,
                // { expiresIn: "15m" }
            );

            res.json({ success: true, token: token });
        }).catch((error) => {
            return res.status(400).json({ error: error.message });
        })
};
