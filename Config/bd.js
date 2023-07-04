const knex = require("knex")({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    pool:{min:0,max:200}, //prueba pool para elephant
    ssl: true,
  },
});

module.exports = knex;
