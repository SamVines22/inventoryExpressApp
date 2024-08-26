const pool = require("./pool");

async function getCategories() {
    const {rows} = await pool.query("SELECT id, name FROM categories");
    return rows;
}

async function getProducts(id) {
    let {rows} = await pool.query("SELECT categories.name AS category, items.id AS item_id, items.name, items.price, items.qty FROM items JOIN categories ON items.cat_id = categories.id WHERE cat_id = $1",[id]);
    if (rows.length == 0)
        {
           let query = await pool.query("SELECT name FROM categories WHERE id = $1",[id]);
           rows = query.rows;    
        } 
    return rows;
}

async function getItem(id) {
    let {rows} = await pool.query("SELECT * FROM items WHERE id = $1",[id]);
    return rows;
}

async function updateItem(id,data) {
  
    await pool.query("UPDATE items SET name = $1, price = $2, qty = $3 WHERE id = $4",[data.name, data.price, data.qty, id]);
}

async function addItem(cat_id, data) {
    console.log(cat_id);
    console.log(data);
    await pool.query("INSERT INTO items (cat_id, name, price, qty) VALUES ($1,$2,$3,$4)",[cat_id,data.name, data.price, data.qty]);
}

async function deleteItem(id){
    console.log(id);
    await pool.query("DELETE FROM items WHERE id = $1",[id]);
}

module.exports = {
    getCategories,
    getProducts,
    getItem,
    updateItem,
    addItem,
    deleteItem
};