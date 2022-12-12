const express = require("express");
const router = express.Router();

const {
    listarInmuebles,
    ingresarInmueble,
    modificarInmueble,
    eliminarInmueble,
    inmuebleById,
    traerImagenPropiedad,
    inmueblesFiltrados
} = require("../Controllers/inmueblesControllers")

const { verifyToken } = require("../Validators/auth");
const { runValidation } = require("../Validators/index");

router.put('/inmuebles/modificar', runValidation, verifyToken, modificarInmueble);
router.post("/inmuebles/filtrados", runValidation, inmueblesFiltrados)
router.get("/inmuebles/list", runValidation, listarInmuebles)
router.post('/inmuebles/nuevaPropiedad', runValidation, verifyToken, ingresarInmueble);
router.get('/inmuebles/detalle/:id', runValidation, verifyToken, inmuebleById)
router.delete('/inmuebles/eliminar/:id', runValidation, verifyToken, eliminarInmueble);
router.get("/inmuebles/imagenPropiedad/:id", traerImagenPropiedad)


module.exports = router;