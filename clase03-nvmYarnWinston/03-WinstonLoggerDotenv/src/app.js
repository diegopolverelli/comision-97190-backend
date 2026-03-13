import __dirname, { logger, logger2, logger3, middLogg } from './utils.js';
import path from 'path';
import express from 'express';
import {engine} from 'express-handlebars';

import { router as vistasRouter } from './routes/vistasRouter.js';
import { router as heroesRouter } from './routes/heroesRouter.js';

const PORT=3000;

const app=express();

app.use(middLogg)
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,'/views'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'/public')));

app.use('/', vistasRouter)
app.use('/api/heroes', heroesRouter)

app.get("/pruebalogs", (req, res)=>{

    // logger.silly("log level silly")
    // logger.debug("log level debug")
    // logger.verbose("log level verbose")
    // logger.http("log level http")
    // logger.info("log level info")
    // logger.warn("log level warn")
    // logger.error("log level error")

    // logger2.leve("Error leve")
    // logger2.medio("Error medio")
    // logger2.error("Error error")
    // logger2.grave("Error grave")

    logger3.silly("log level silly")
    logger3.debug("log level debug")
    logger3.verbose("log level verbose")
    logger3.http("log level http")
    logger3.info("log level info")
    logger3.warn("log level warn")
    logger3.error("log level error")

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"Logs testeados"});
})

const server=app.listen(PORT,()=>{
    // console.log(`Server escuchando en puerto ${PORT}`);
    // logger.log("info", `Server escuchando en puerto ${PORT}`)
    // logger.info(`Server escuchando en puerto ${PORT}`)
    logger3.info(`Server escuchando en puerto ${PORT}`)
});
