const express = require('express');
const path = require('path');
var bodyParser = require("body-parser");
var aluno = require("./routes/aluno");

const app = express();

let consoleMethod = (req,res, next)=>{
    console.log(req.method);
    next(); //executar o próximo middleware
    //next("erro de qqr coisa") - se colocar um parametro, toda vez que ele parar ele executa o parametro pq significa que algo aconteceu
}

let consoleBody = (req, res, next) =>{
    console.log(req.body);
    next()
}

let hello = (req,res)=>{
    res.send("Hello World");
}


//app.use("/meusite",express.static(path.join(__dirname, 'client')));

//use é um middleware que serve para qqr tipo de método, significa que é para funcionar para todos os métodos

app.use(bodyParser.urlencoded());

app.use("/aluno", aluno);

app.get("/", (req,res)=>{
    // res.set("Content-Type", "text/plain")
    res.type('txt'); 
    //tipos: txt(plain), html, json, png
    res.send("<h1>Hello World from GET</h1>");
})



app.post("/",(req,res)=>{
 
    res.send("<h1>Hello World from POST</h1>");
})

app.use("/", bodyParser.json());
app.put("/", consoleBody, hello);

app.delete("/", consoleMethod, hello);


const PORT = 5000;
app.listen(PORT, ()=> {
    console.log(`Server running on Port:${PORT}`);
})