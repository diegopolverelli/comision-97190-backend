const express=require('express');
const { customResponses } = require('./middlewares/customResponses.js');
const PORT=3000;

const app=express();
app.use(customResponses)

app.use(express.static("./src/public", {
    maxAge: 1000 * 60 * 5, 
    setHeaders:(res, path)=>{
        console.log(path)
        if(path.endsWith(".jpg")){
            res.setHeader("Cache-Control", "public, max-age=600");
        }
    }
}))
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    // res.setHeader('Content-Type','text/plain');
    // res.status(200).send('OK');
    res.success("Home Page")
})


app.get('/users',(req,res)=>{

    let usuarios=[
        {id:1, nombre:"Luciana", email:"luciana@test.com", password:"123", rol:"user"},
        {id:2, nombre:"Juan", email:"juan@test.com", password:"123", rol:"user"},
        {id:3, nombre:"Romina", email:"romina@test.com", password:"123", rol:"admin"},
    ]

    if(req.query.error){
        res.setHeader('Cache-Control','no-store');
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:``})
    }

    res.setHeader('Cache-Control','public, max-age=10');
    res.setHeader('Content-Type','application/json');
    return res.status(200).json({usuarios});
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
