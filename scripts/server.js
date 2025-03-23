const express = require("express");
const app = express();
const path = require("path");
const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);
const cors = require("cors");
app.use(cors());
let users;
async function fetchCollection(dbName, colName) {
    try {
        const db = await client.db(dbName);
        const users = db.collection(colName);
        return users;
    }
    catch(err) {
        console.error("Can't fetch collection: "+err);
    }
}

async function addUser(username,email,domain,pass) {
    const users = await userDB();
    const query = {username: `${username}`};
    const observedUser = await users.findOne(query);
    if(observedUser) {
        console.log("User already present");
    }
}

app.use(express.static(path.join(__dirname,"../")));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.get("/",function(req,res) {
    res.sendFile(path.join(__dirname,"../html/signUp.html"));
});
app.get("/login",function(req,res) {
    res.sendFile(path.join(__dirname,"../html/login.html"));
});
app.get("/leaderboard",function(req,res) {
    res.sendFile(path.join(__dirname,"../html/leaderboard.html"));
});
app.get("/signUp",(req,res) => {
    res.sendFile(path.join(__dirname,"../html/signUp.html"));
})
app.post("/validateSignup",async (req,res) => {
    //Logic for validating username and password
    console.log("Entered into website");
    const { username, email, pass1, pass2, domain} = req.body;
    const users = await userDB();
    const query = {username: `${username}`};
    const observedUser = await users.findOne(query);
    if(observedUser) {
        res.sendFile(path.join(__dirname,"../html/signUp.html"));
    }
});
app.post("/checkUsername",async (req,res) => {
    console.log("checking username");
    const {username} = req.body;
    console.log(`Checking for presence of ${username} in DB...`);
    try {
        const user = await users.findOne({username: username});
        console.log(`Retrieved user: ${user}`);
        if(user) {
            return res.json({exists: true});
        }
        else    
            return res.json({exists : false});
    }
    catch(error) {
        console.err("Error fetching usernames");
    }
});
app.listen("5000", async () => {
    await client.connect();
    console.log("Connected to Kollywood database...");
    users = await fetchCollection("Kollywood","Users");
    console.log("User database ready...");
});
console.log("Server listening at port 5000");