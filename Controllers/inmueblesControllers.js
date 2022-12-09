const knex = require("../Config/bd");
const formidable = require('formidable');
const fs = require("fs")

exports.listarInmuebles = (req, res) => {
    knex.select("*")
        .from("inmuebles")
        .join("direcciones", { 'direcciones.id_inmueble': "inmuebles.id_inmueble" })
        .then((resultado) => {
            res.json(resultado);
        })
        .catch((error) => {
            res.status(400).json({ error: error.message });
        });
};
exports.traerImagenPropiedad = async (req, res) => {
    const inmuebleId = req.params.id
    knex("inmuebles")
        .where({ id_inmueble: inmuebleId })
        .then((result) => {
            if (!result[0].filedata) {
                res.json({
                    error: "No hay imagen"
                })
                return
            }
            res.set("Content-Type", result[0].filetype);
            return res.send(result[0].filedata);
        })
        .catch((error) => {
            res.status(400).json({
                errror: error.message
            })
        })
}

exports.ingresarInmueble = async (req, res) => {

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "No se pudo cargar la imagen"
            });
        }
        console.log(files.file)
        let fileData;
        let fileType;
        if (files.file) {
            if (files.file.size > 10000000) {
                return res.statu(400).json({
                    error: "Tamaño maximo de la imagen: 1MB"
                })
            }
            fileData = fs.readFileSync(files.file.filepath);
            fileType = files.file.mimetype
        }
        const { descripcion, m2, tipo_inmueble, tipo_operacion, precio, dormitorios, direccion, pais, departamento, barrio } = fields

        try {
            await knex.transaction(async (trx) => {
                const inmueble_nuevo = await trx('inmuebles')
                    .insert({
                        descripcion: descripcion,
                        m2: m2,
                        precio: precio,
                        tipo_inmueble: tipo_inmueble,
                        tipo_operacion: tipo_operacion,
                        dormitorios: dormitorios,
                        filedata: fileData,
                        filetype: fileType

                    }, 'id_inmueble');

                await trx('direcciones')
                    .insert({
                        direccion: direccion,
                        pais: pais,
                        departamento: departamento,
                        barrio: barrio,
                        id_inmueble: inmueble_nuevo[0].id_inmueble
                    });
            })
            res.json({
                mensaje: "El inmueble se ha ingresado correctamente"
            })
        } catch (error) {
            res.status(400).json({ error: error.message });
        }

    })

}
/*/////////////////////////////////////////////////////////////////////////////////////////////////*/
exports.modificarInmueble = async (req, res) => {

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "No se pudo cargar la imagen"
            });
        }
        console.log(files.file)
        let fileData;
        let fileType;
        if (files.file) {
            if (files.file.size > 10000000) {
                return res.statu(400).json({
                    error: "Tamaño maximo de la imagen: 1MB"
                })
            }
            fileData = fs.readFileSync(files.file.filepath);
            fileType = files.file.mimetype
        }

        const { descripcion, m2, tipo_inmueble, tipo_operacion, precio, dormitorios, direccion, pais, departamento, barrio } = fields
        const id = fields.id
        try {
            await knex.transaction(async (trx) => {
                const inmueble_modificado = await trx('inmuebles')
                    .where("inmuebles.id_inmueble", id)
                    .update({
                        descripcion: descripcion,
                        m2: m2,
                        precio: precio,
                        tipo_inmueble: tipo_inmueble,
                        tipo_operacion: tipo_operacion,
                        dormitorios: dormitorios,
                        filedata: fileData,
                        filetype: fileType

                    }, 'id_inmueble');
                console.log(inmueble_modificado);

                await trx('direcciones')
                    .where("direcciones.id_inmueble", id)
                    .update({
                        direccion: direccion,
                        pais: pais,
                        departamento: departamento,
                        barrio: barrio,

                    });
            })
            res.json({
                mensaje: "El inmueble se ha modificado correctamente"
            })
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    })
}

exports.eliminarInmueble = async (req, res) => {

    const id = req.params.id;

    try {
        await knex.transaction(async (trx) => {
            const propiedadEliminada = await trx('direcciones')
                .where("direcciones.id_inmueble", id)
                .del();
            console.log(propiedadEliminada);

            await trx('inmuebles')
                .where('inmuebles.id_inmueble', id)
                .del();
        })
        res.json({
            mensaje: "El inmueble se ha eliminado correctamente"
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.inmuebleById = (req, res) => {

    const id = req.params.id;
    knex("inmuebles")
        .where("inmuebles.id_inmueble", id)
        .then((resultado) => {
            if (resultado.length) {
                res.json(resultado[0])
            }
            else {
                res.status(404).json({ error: "No existe el Id en la base de datos" });

            };
        }).catch((error) => {
            res.status(400).json({ error: error.message });
        })
}
exports.inmueblesFiltrados = (req, res) => {
    const { operacion, tipo, dormitorios, departamento } = req.body

    knex.select("*")
        .from("inmuebles")
        .join("direcciones", { 'direcciones.id_inmueble': "inmuebles.id_inmueble" })
        .then((resultado) => {
            if (operacion !== "" && operacion !== undefined) {
                resultado = resultado.filter(item => { return item.tipo_operacion == operacion })
            }
            if (tipo !== "" && tipo !== undefined) {
                resultado = resultado.filter(item => { return item.tipo_inmueble == tipo })
            }
            if (dormitorios !== "" && dormitorios !== undefined) {
                resultado = resultado.filter(item => { return item.dormitorios == dormitorios })
            }
            if (departamento !== "" && departamento !== undefined) {
                resultado = resultado.filter(item => { return item.departamento == departamento })
            }
            res.json(resultado)
        })
        .catch((error) => {
            res.status(400).json({ error: error.message });
        })
}