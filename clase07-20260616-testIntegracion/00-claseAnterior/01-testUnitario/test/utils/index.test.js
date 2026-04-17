import {describe, it} from "mocha"
import {expect, should} from "chai"
import { createHash, passwordValidation } from "../../src/utils/index.js"


describe("Test funciones de hash", ()=>{
    // after, before...???

    it("Si envío un texto a createHash, retorna un hash en formato bcrypt", async()=>{
        let password="prueba1"

        let resultado=await createHash(password)

        expect(resultado).not.to.be.eq(password)
        expect(resultado.length).is.greaterThan(15)
        expect(resultado.slice(0, 4)).to.be.equal("$2b$")
    })

    it("La funcion passwordValidation si recibe una password, y su hash, retorna true, en caso de coincidir", async()=>{

        let password="123456"
        let hash=await createHash(password)

        let userMock={
            password: hash
        }

        let resultado=await passwordValidation(userMock, password)
        expect(resultado).to.be.true
    })

    it("La funcion passwordValidation si recibe una password incorrecta, y un hash, retorna false, en caso de coincidir", async()=>{

        let password="123456"
        let hash=await createHash(password)

        let userMock={
            password: hash
        }

        let resultado=await passwordValidation(userMock, "56789")
        expect(resultado).to.be.false
    })
})