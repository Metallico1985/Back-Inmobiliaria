const knex = require("knex")({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    ssl: true,
  },
  pool:{
    min:2,
    max:10
  }
});

module.exports = knex;
