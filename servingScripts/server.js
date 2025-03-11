var express = require("express");
var app = express();
var path = require("path");
app.use(express.static(path.join(__dirname,"../")));
app.get("/",function(req,res) {
    res.sendFile(path.join(__dirname,"../html/index.html"));
});
app.get("/login",function(req,res) {
    res.sendFile(path.join(__dirname,"../html/login.html"));
});
app.get("/leaderboard",function(req,res) {
    res.sendFile(path.join(__dirname,"../html/leaderboard.html"));
});
app.listen("5000");
console.log("Server listening at port 5000");