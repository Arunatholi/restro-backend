const app = require("./app");
const dotenv = require("dotenv");
const databaseConnection = require("./config/databaseConnection");
// const PORT = 5000;

dotenv.config({path:"./config/config.env"});

// app.use("/static/", express.static("img"));

databaseConnection();

app.listen(process.env.PORT,function(){
    console.log(`server listening on ${process.env.PORT}`);
});