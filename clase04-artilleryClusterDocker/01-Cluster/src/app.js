import express from 'express';
import cluster from "cluster"
import os from "os"
import { router as pruebasRouter } from './routes/pruebaRouter.js';

if(cluster.isPrimary){

    // console.log(os.cpus())

    console.log(`Proceso primary. PID: ${process.pid}; generando workers...!!!`)

    // cluster.fork()
    // cluster.fork()
    // cluster.fork()

    for(let i=0; i<os.cpus().length; i++){
        cluster.fork()
    }

    // process.on("exit", code=>{
    //     console.log("saliendo...!!!")
    // })

    cluster.on("disconnect", (worker, message)=>{
        console.log(`Se ha desconectado el worker ${worker.id} con pid: ${worker.process.pid}. Generando reemplazo...!!!`)
        cluster.fork()
    })

}else{
    const PORT=3000;

    const app=express();
    
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    
    app.use("/", pruebasRouter)
    
    let visitas=0
    app.get('/',(req,res)=>{
        visitas++
        res.setHeader('Content-Type','text/plain');
        res.status(200).send(`Visitas: ${visitas}`);
    })
    
    const server=app.listen(PORT,()=>{
        console.log(`Server escuchando en puerto ${PORT} - PID: ${process.pid} - worker: ${cluster.worker.id}`);
    });
   
}

