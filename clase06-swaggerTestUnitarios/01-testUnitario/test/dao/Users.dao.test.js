// config
import {describe, it} from "mocha"
import {expect} from "chai"
import Assert from "assert"

import Users from "../../src/dao/Users.dao.js"

import mongoose from "mongoose"

await mongoose.connect('mongodb+srv://coderhouse:codercoder2023@cluster0.wpxpupc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&dbName=comisPruebas')

const usersDAO=new Users()

// estimulos
// let resultado=suma(5, 5)
// resultado=suma(5, null)

describe("Pruebas DAO Ususarios", function(){
    this.timeout(10_000)

    after(async()=>{
        await mongoose.connection.collection("users").deleteMany({email: "usertest@test.com"})
        console.log(`Esto corre 1 sola vez cuando terminan todos los it's`)
    })
    afterEach(()=>{
        console.log(`Esto corre cada vez que termina un it`)        
    })
    before(()=>{
        console.log(`Esto corre 1 sola vez antes de que inicie el 1er it`)
    })
    beforeEach(()=>{
        console.log(`Esto corre antes de cada it`)        
    })

    it("El metodo get retorna un array de usuarios", async()=>{
        // estimulo
        let resultado=await usersDAO.get()

        // assert o afirmación
        expect(Array.isArray(resultado)).to.be.true
        if(resultado.length>0){
            expect(resultado[0]).to.has.property("first_name")
            expect(resultado[0].last_name).to.be.ok
        }
    })

    it("El metodo get retorna un array de usuarios 2", async()=>{
        // estimulo
        let resultado=await usersDAO.get()

        // assert o afirmación
        expect(Array.isArray(resultado)).to.be.true
        if(resultado.length>0){
            expect(resultado[0]).to.has.property("first_name")
            expect(resultado[0].last_name).to.be.ok
        }
    })

    it("El metodo get retorna un array de usuarios 3", async()=>{
        // estimulo
        let resultado=await usersDAO.get()

        // assert o afirmación
        expect(Array.isArray(resultado)).to.be.true
        if(resultado.length>0){
            expect(resultado[0]).to.has.property("first_name")
            expect(resultado[0].last_name).to.be.ok
        }
    })
    // it()
    // it()
    // it()
    // it()
    // it()
    // it()

})



// asserts 