import fs from "fs"


// console.log("hola")
console.log("process pid", process.pid)
console.log("process cwd", process.cwd())
console.log("memory usage", process.memoryUsage())
console.log(process.env)
console.log("PRUEBA_PORT",process.env.PRUEBA_PORT)
console.log("PRUEBA_SECRET",process.env.PRUEBA_SECRET)

// const PORT=3000
const PORT=process.env.PRUEBA_PORT
console.log({PORT})

console.log("process.argv:",process.argv)