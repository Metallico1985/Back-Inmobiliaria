const knex = require("../Config/bd");
// const formidable = require('formidable');


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




// exports.ingresarInmueble = async (req, res) => {

//     let form = new formidable.IncomingForm();
//     form.keepExtensions = true;

//     form.parse(req, (err, fields, files) => {
//         if (err) {
//             return res.status(400).json({
//                 error: "No se pudo cargar la imagen"
//             });
//         }
//         const { descripcion, m2, tipo_inmueble, tipo_operacion, precio, dormitorios, direccion, pais, departamento, barrio } = fields

//         try {
//             await knex.transaction(async (trx) => {
//                 const inmueble_nuevo = await trx('inmuebles')
//                     .insert({
//                         descripcion: descripcion,
//                         m2: m2,
//                         precio: precio,
//                         tipo_inmueble: tipo_inmueble,
//                         tipo_operacion: tipo_operacion,
//                         dormitorios: dormitorios

//                     }, 'id_inmueble');
//                 console.log(inmueble_nuevo);

//                 await trx('direcciones')
//                     .insert({
//                         direccion: direccion,
//                         pais: pais,
//                         departamento: departamento,
//                         barrio: barrio,
//                         id_inmueble: inmueble_nuevo[0].id_inmueble
//                     });
//             })
//             res.json({
//                 mensaje: "El inmueble se ha ingresado correctamente"
//             })
//         } catch (error) {
//             res.status(400).json({ error: error.message });
//         }
//     })
// }

exports.ingresarInmueble = async (req, res) => {

    const { descripcion, m2, tipo_inmueble, tipo_operacion, precio, dormitorios, direccion, pais, departamento, barrio } = req.body;
    try {
        await knex.transaction(async (trx) => {
            const inmueble_nuevo = await trx('inmuebles')
                .insert({
                    descripcion: descripcion,
                    m2: m2,
                    precio: precio,
                    tipo_inmueble: tipo_inmueble,
                    tipo_operacion: tipo_operacion,
                    dormitorios: dormitorios

                }, 'id_inmueble');
            console.log(inmueble_nuevo);

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
};

exports.modificarInmueble = async (req, res) => {

    const { descripcion, m2, tipo_inmueble, tipo_operacion, precio, dormitorios, direccion, pais, departamento, barrio } = req.body;
    const id = req.params.id
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
                    dormitorios: dormitorios

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
};

exports.eliminarInmueble = async (req, res) => {

    const id = req.params.id;
    console.log(id)
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
                res.json(resultado)
            }
            else {
                res.status(404).json({ error: "No existe el Id en la base de datos" });
            };
        })
}