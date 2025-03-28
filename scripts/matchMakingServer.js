const express = require("express");
const app = express();
const path = require("path");
const { MongoClient } = require("mongodb");
const {Server} = require("socket.io");
const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);
const argon = require("argon2");
const cors = require("cors");
app.use(cors());
app.use(express.static(path.join(__dirname,"../")));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

