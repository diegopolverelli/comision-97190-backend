import dotenv from "dotenv"
import {Command, Option} from "commander"

const program=new Command()

program.addOption(new Option("-m, --mode <MODE>", "Modo de ejecución del script").choices(["dev", "prod"]).default("prod"))

program.parse()
const {mode}=program.opts()


// const mode="dev"
dotenv.config({
    path: mode=="prod"?"./.env.prod":"./.env.dev", 
    quiet: true, 
    override: true
})


export const CONFIG={
    PORT: process.env.PORT || 3000,
    MONGO_URL: process.env.MONGO_URL, 
    DB_NAME: process.env.DB_NAME
}