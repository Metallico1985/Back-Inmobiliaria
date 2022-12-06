const express = require("express");
const router = express.Router();

const {
    listarInmuebles,
    registrarInmueble,
    modificarInmueble,
    eliminarInmueble,
    inmuebleById
} = require("../Controllers/inmueblesControllers")

const { verifyToken } = require("../Validators/auth");
const { runValidator } = require("../Validators/index");


router.get('/inmuebles/list', verifyToken, runValidator, listarInmuebles);
router.post('/inmuebles/registrar', verifyToken, runValidator, registrarInmueble);
router.get('/inmuebles/detalle/:id', verifyToken, runValidator, inmuebleById)
router.put('/inmuebles/modificar/:id', verifyToken, runValidator, modificarInmueble);
router.delete('/inmuebles/eliminar/:id', verifyToken, runValidator, eliminarInmueble);

module.exports = router;