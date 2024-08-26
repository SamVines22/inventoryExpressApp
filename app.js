const express = require("express");
const app = express();
const path = require("node:path");
const PORT = process.env.PORT || 3000;
const indexRouter = require("./routes/indexRouter");

app.use(express.urlencoded({extended: true}));
app.use("/", indexRouter);

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");



//app.get("/search", indexRouter)

app.listen(PORT, ()=> console.log(`open on port ${PORT}`));