const {Pool} = require("pg");
require("dotenv").config();
const user = process.env.USER;
const pw = process.env.DATABASE_PASSWORD;

module.exports = new Pool({
    host: "localhost",
    user: user,
    database: "golf_inventory",
    password:pw,
    port: 5432

});