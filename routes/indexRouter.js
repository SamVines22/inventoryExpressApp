const {Router} = require("express");
const controller = require("../controller/indexController");
const indexRouter = Router();



indexRouter.get("/", controller.index);
indexRouter.get("/search", controller.search);
indexRouter.post("/add/:category_id", controller.add);
indexRouter.get("/item/:item_id", controller.product);
indexRouter.get("/update/:item_id", controller.update);
indexRouter.post("/update/:item_id", controller.updatePost);
indexRouter.get("/delete/:item_id",controller.deleteItem);



module.exports = indexRouter;