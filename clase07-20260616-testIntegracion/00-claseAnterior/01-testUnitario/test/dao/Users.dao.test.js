// config
import {describe, it} from "mocha"
import {expect} from "chai"
import Assert from "assert"

import Users from "../../src/dao/Users.dao.js"

import mongoose, { isValidObjectId } from "mongoose"

await mongoose.connect('mongodb+srv://coderhouse:codercoder2023@cluster0.wpxpupc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&dbName=comisPruebas')

const usersDAO=new Users()

// estimulos
// let resultado=suma(5, 5)
// resultado=suma(5, null)

describe("Pruebas DAO Ususarios", function(){
    this.timeout(10_000)

    before(()=>{
        console.log(`Esto corre 1 sola vez antes de que inicie el 1er it`)
    })
    beforeEach(()=>{
        console.log(`Esto corre antes de cada it`)        
    })
    after(async()=>{
        console.log(`Esto corre 1 sola vez cuando terminan todos los it's`)
    })
    afterEach(async()=>{
        await mongoose.connection.collection("users").deleteMany({email: "usertest@test.com"})
        console.log(`Esto corre cada vez que termina un it`)        
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

    it("El metodo get retorna un array de usuarios, con las properties first_name y last_name", async()=>{
        // estimulo
        let resultado=await usersDAO.get()

        // assert o afirmación
        expect(Array.isArray(resultado)).to.be.true
        if(resultado.length>0){
            expect(resultado[0]).to.has.property("first_name")
            expect(resultado[0].last_name).to.be.ok
        }
    })

    it("El metodo save retorna un objeto con property _id", async()=>{
        // estimulo

        let userMock={
            first_name: "test", 
            last_name: "test", 
            email: "usertest@test.com", 
            password: "123",
        }

        let resultado=await usersDAO.save(userMock)

        // assert o afirmación

        expect(resultado).to.has.property("_id")
    })

    it("El metodo save retorna un objeto con property _id, de tipo Mongo ObjectID", async()=>{
        // estimulo

        let userMock={
            first_name: "test", 
            last_name: "test", 
            email: "usertest@test.com", 
            password: "123",
        }

        let resultado=await usersDAO.save(userMock)

        // assert o afirmación

        expect(isValidObjectId(resultado._id)).to.be.true
    })    

    it("El metodo save graba un user en DB", async()=>{
        // estimulo

        let userMock={
            first_name: "test", 
            last_name: "test", 
            email: "usertest@test.com", 
            password: "123",
        }

        let resultado=await usersDAO.save(userMock)

        let user=await mongoose.connection.collection("users").findOne({_id: resultado._id})
        // assert o afirmación

        expect(user).not.to.be.null
        expect(user).to.has.property("first_name").and.to.be.eq(userMock.first_name)
    })

})



// asserts 