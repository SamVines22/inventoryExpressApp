const {Client} = require("pg");
require("dotenv").config();
const user = process.env.USER;
const pw = process.env.DATABASE_PASSWORD;

//const SQL = `INSERT INTO categories (name) VALUES ('woods'), ('irons'), ('balls'), ('gloves'), ('clothes');`;
const SQL = `INSERT INTO items (name, cat_id, price, qty) VALUES ('Taylor Made Driver', 1, 333.00, 5), ('Titliest Irons', 2, 699.99, 3), 
('Titliest Pro-V1',3, 15.00, 78), ('Callaway Balls', 3, 12.50, 89 ), ('Ping Shirt', 5, 35.99, 20)`;

async function main() {
    console.log("seeding....");
    const client = new Client({connectionString: `postgresql://${user}:${pw}@localhost:5432/golf_inventory`});
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");

}

main();