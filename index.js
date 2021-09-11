const express = require('express');
const path = require('path');
var bodyParser = require("body-parser");

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

let alunos = [{id: 0, nome: "José"},
    {id: 1, nome: "Maria"},
    {id: 2, nome: "João"},
    {id: 3, nome: "Marcos"}]

//app.use("/meusite",express.static(path.join(__dirname, 'client')));

//use é um middleware que serve para qqr tipo de método, significa que é para funcionar para todos os métodos

app.use(bodyParser.urlencoded());

app.get("/", (req,res)=>{
    // res.set("Content-Type", "text/plain")
    res.type('txt'); 
    //tipos: txt(plain), html, json, png
    res.send("<h1>Hello World from GET</h1>");
})


app.get("/alunos", (req,res)=>{
    res.json(JSON.stringify(alunos));
    
})

app.get("/aluno/:id", (req,res)=>{
    //console.log(req.body);
    console.log(req.params.id)
    let aluno = alunos[req.params.id];
    res.json(aluno);
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