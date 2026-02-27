import express from 'express';

// let {nombre, email}=req.body

// let [ dirNode, rutaScript, ...argumentos ]=process.argv   // ... son operador REST
let [ , , ...argumentos ]=process.argv   // ... son operador REST

let indicePort=argumentos.findIndex(a=>a=="--port")

if(indicePort==-1){
    console.log(`El flag --port <PORT> es obligatorio`)
    process.exit()
}

const PORT=argumentos[indicePort + 1];

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});


