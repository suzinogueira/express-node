const express = require('express');
const path = require('path');


const app = express();

app.use("/meusite",express.static(path.join(__dirname, 'client')));

app.get("/", (req,res)=>{
    // res.set("Content-Type", "text/plain")
    res.type('txt'); 
    //tipos: txt(plain), html, json, png
    res.send("<h1>Hello World from GET</h1>");
})

const PORT = 5000;
app.listen(PORT, ()=> {
    console.log(`Server running on Port:${PORT}`);
})