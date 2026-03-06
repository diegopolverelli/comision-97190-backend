import express from 'express';
import handlebars from 'express-handlebars'
import zlib from "zlib"
import compression from "express-compression"

const PORT=3000;

const app=express();

app.use(compression(
    {
        // threshold: "50kb", 
        filter: (req, res)=>{
            console.log(req.query)
            
            console.log(req.path)
            let type=req.path.split(".")[1]
            console.log(type)
            if(req.query.nocomprimir || (type && type.toLowerCase()=="bmp")){
                return false
            }
            console.log(req.query.nocomprimir)

            return true
        }, 
        brotli: {enabled: true},
    }
))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./src/public"))
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', './src/views')


app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

app.get('/heroes',(req,res)=>{


    res.render("prueba")
})


app.get('/prueba1',(req,res)=>{
    let texto="texto muuuuy largo...".repeat(200_000)
    // let textoComprimido=zlib.gzipSync(texto, {level: zlib.constants.Z_DEFAULT_LEVEL})
    let textoComprimido=zlib.brotliCompressSync(texto, {level: 6})


    // res.setHeader('Content-Encoding','gzip');
    res.setHeader('Content-Encoding','br');
    res.setHeader('Content-Type','text/plain');
    return res.status(200).send(textoComprimido);
})


const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
