import {Command, Option} from "commander"
import express from "express"

const program=new Command()

program.option("-p, --port <PORT>", "Puerto donde escuchara el backend", 3000)
program.option("-d, --debug", "Activa el modo Debug",)
program.option("-c, --colors [COLORS...]", "Listado colores",)
// program.requiredOption("-u, --user", "Usuario que ejecuta el script", "root")
program.requiredOption("-u, --user <USER>", "Usuario que ejecuta el script", )

program.addOption(new Option("-m, --mode <MODE>", "Modo de ejecución del script").choices(["dev", "prod", "test"]).default("dev"))

program.parse()
const opts=program.opts()

console.log(opts)

const PORT=opts.port;


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
