let http = require("http");
let url = require("url");
let qs = require("queryString");
const { readFileSync } = require("fs");

let server = http.createServer(function(req,res) {
    if(req.url=="/") {
        res.setHeader("content-type","text/html");
        page = readFileSync("../html/index.html");
        console.log(page);
        res.end(page);
    }
});
server.listen(5090);
console.log("Server listening at 172.16.1.192:5090...");