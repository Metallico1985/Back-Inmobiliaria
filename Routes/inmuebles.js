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

router.post("/inmuebles/filtrados", runValidation, inmueblesFiltrados)
router.get("/inmuebles/list", listarInmuebles)
router.post('/inmuebles/nuevaPropiedad', ingresarInmueble);
router.get('/inmuebles/detalle/:id', runValidation, verifyToken, inmuebleById)
router.put('/inmuebles/modificar/:id', runValidation, modificarInmueble);
router.delete('/inmuebles/eliminar/:id', runValidation, verifyToken, eliminarInmueble);
router.get("/inmuebles/imagenPropiedad/:id", traerImagenPropiedad)


module.exports = router;