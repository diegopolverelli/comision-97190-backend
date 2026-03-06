import express from 'express';
import { router as heroesRouter } from './routes/heroesRouter.js';
import { errorHandler } from './middlewares/errorHandler.js';

process.loadEnvFile("./.env")

const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/heroes', heroesRouter)

process.on("uncaughtException", (error)=>{
    // tareas de cierre de DB, log, etc. 
    process.exit()
})

app.get('/',(req,res)=>{

    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})


app.get('/prueba',(req,res)=>{

    throw new Error("error prueba...")

    res.setHeader('Content-Type','text/plain');
    res.status(200).send('Prueba');
})


app.get('/prueba2',async(req,res,next)=>{

    try {
        throw new Error("error prueba...")
        
    } catch (error) {
        // res.setHeader('Content-Type','application/json');
        // return res.status(500).json({error:`Error`})
        return next(error)
    }

    res.setHeader('Content-Type','text/plain');
    res.status(200).send('Prueba 2');
})

app.use(errorHandler)

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
