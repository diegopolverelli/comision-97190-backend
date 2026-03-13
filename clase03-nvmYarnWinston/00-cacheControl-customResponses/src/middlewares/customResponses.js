const customResponses=(req, res, next)=>{
    res.success=(message, data, code=200, cache="public, max-age=60")=>{
        res.setHeader("Cache-Control", cache);
        return res.status(code).json({
            status: "ok",
            message, 
            data,
            timestamp: new Date().toUTCString()
        })
    }

    res.error=(error, code=400)=>res.status(code).json({
        status: "error",
        error, 
        timeStamp: new Date().toUTCString()
    })


    next()
}

module.exports={customResponses}