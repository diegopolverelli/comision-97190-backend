import dotenv from "dotenv"
dotenv.config({
    path: "./.env", 
    override: true, 
    quiet: true
})

// process.loadEnvFile("./.env")

console.log("SECRET:", process.env.SECRET)
console.log("MONGO_URL:", process.env.MONGO_URL)
console.log("PRUEBA_SECRET", process.env.PRUEBA_SECRET)
console.log("PRUEBA_PORT", process.env.PRUEBA_PORT)