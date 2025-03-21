const express = require("express");
const app = express();
const path = require("path");
const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);

async function userDB() {
    try {
        await client.connect();
        console.log("Connected to DB");
        const db = client.db("users");
        const users = db.collection("user-details");
        return users;
    }
    catch(err) {
        console.error("Can't connect to DB");
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
    const users = await userDB();
    console.log("Connected to DB");
    const {username} = req.body;
    try {
        const user = users.findOne({username});
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
app.listen("5000", () => {
    const users =  userDB();
});
console.log("Server listening at port 5000");