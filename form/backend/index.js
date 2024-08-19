const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyparser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyparser.json());

const secretkey = "abcdef";

const users = [];

const verifyToken = (req,res,next) => {
const token = req.headers.authorization;
if(!token) return res.status(401).send("Request Dinied");

try{
    const verified = jwt.verifty(token,secretkey);

    req.user = verified;
    next();
}
catch (error){
    res.status(400).send("Invalid Token");
}
}
app.post('/signUp',async (req,res) => {
    try{
        
        const {username,password} = req.body;
        const hashPassword = await bcrypt.hash(password,10);
        users.push({username,password: hashPassword});
        console.log(users);

        res.status(201).send("User created Sucessfully");
        }
        catch(error){
            res.status(500).send("Error craeting user");
        };
        
})

app.post('/login',async (req,res) => {
    try{
        const {username,password} = req.body;
        console.log(req.body)
        const user = users.find(u => u.username === username);
        console.log(user)
        if(!user) return res.status(400).send("User not found");

        const validPassword = await bcrypt.compare(password,user.password);
        if(!validPassword) return res.status(400).send("Invalid Password");


        const token = jwt.sign({ username : user.username }, secretkey)
        res.send(token);
    }
    catch(error){
        res.status(500).send("error logging in")

    }
})

app.get('/profile',verifyToken,(req,res) => {

   res.send(`Welcome ${req.user.username}`)

})
app.get('/',(req,res) => {
    res.send("helloworld");
})

app.listen(3001,() => console.log("backend running in the port 3001"))
