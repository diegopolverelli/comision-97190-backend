import { fileURLToPath } from 'url';
import { dirname } from 'path';
import winston from "winston"
process.loadEnvFile("./.env")

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;

export const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: "debug",
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.colorize(),
                winston.format.simple(),
            )
        }),
        new winston.transports.File({
            level: "error",
            filename: "./src/logs/error.log",
            format: winston.format.combine(
                winston.format.timestamp(),
                // winston.format.colorize(), 
                winston.format.json(),
            )
        })
    ]
})

export const middLogg = (req, res, next) => {
    req.logger = logger

    next()
}

export const logger2 = winston.createLogger({
    levels: { grave: 0, error: 1, medio: 2, leve: 3 },
    transports: [
        new winston.transports.Console({
            level: "medio",
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.colorize({ colors: { grave: "red", error: "magenta", medio: "yellow", leve: "green" } }),
                winston.format.simple(),
            )
        })
    ]
})

const trasportConsola = new winston.transports.Console({
    level: "debug",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.simple(),
    )
})

const mode = process.env.MODE

export const logger3 = winston.createLogger({
    transports: [
        new winston.transports.File({
            level: "error",
            filename: "./src/logs/error.log",
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json(),
            )
        })
    ]
})

if(mode!="production"){
    logger3.add(trasportConsola)
}