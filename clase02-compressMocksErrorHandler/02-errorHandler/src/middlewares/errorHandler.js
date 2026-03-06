export const errorHandler=(error, req, res, next)=>{
    console.log(`Ocurrió un error: ${error.message}`)

    if(error.custom){
        res.setHeader('Content-Type','application/json');
        return res.status(error.code).json({error:`Error interno del servidor`, user: error.user})
    }else{
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({error:`Error interno del servidor`})
    }
}