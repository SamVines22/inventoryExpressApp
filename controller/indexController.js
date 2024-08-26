const db = require("../db/queries");

async function index (req, res) {
    const categories = await db.getCategories();
    res.render("index", {categories:categories});
}

async function search (req, res) {
    const id = req.query.category;
    const products = await db.getProducts(id);
    if (products[0].qty === undefined) {
         const message = `Nothing in stock for product category: ${products[0].name}`;
         res.render("noCat", {message:message});
    }
    else {
        res.render("search", {products: products, id:id});
    }
}

async function product(req,res) {
    const id = req.params.item_id;
    const item = await db.getItem(id);
    res.render("item", {item:item[0]});
}

async function update(req,res) {
    const id = req.params.item_id;
    const data = await db.getItem(id);
    const cat_id = data[0].cat_id;
    const categories = await db.getCategories();
    const name = categories.filter((item)=> {
        if (item.id == cat_id)
            {
                return item;
            }
    })
    res.render("update", {data: data[0], category:name, categories:categories});
}

async function updatePost(req,res) {
   
    const id = req.params.item_id;
    db.updateItem(id, req.body);
    res.redirect(`/item/${id}`);
}

async function add(req,res){
    const cat_id = req.params.category_id;
    await db.addItem(cat_id, req.body);
    const products = await db.getProducts(cat_id);
    res.render("search",{products:products, id:cat_id});
}

async function deleteItem (req,res){
    const {item_id} = req.params;
    const item = await db.getItem(item_id);
    console.log(item);
    if (item.length == 0)
        {
            res.redirect("/");
        }
    else {
        await db.deleteItem(item_id);
        res.render("delete", {deletedItem:item});
        }
}

module.exports = {
    index,
    search,
    product,
    update,
    updatePost,
    add,
    deleteItem
}