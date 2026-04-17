import {describe, it} from "mocha"
import {expect} from "chai"
import supertest from "supertest"

// import { server } from "../src/app.js"

import mongoose, { isValidObjectId } from "mongoose"
await mongoose.connect('mongodb+srv://coderhouse:codercoder2023@cluster0.wpxpupc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&dbName=comisPruebas')

let requester=supertest("http://localhost:8080")
// let requester=supertest(server)

describe("Test app AdoptMe", ()=>{

    describe("Test router de sessions", ()=>{
        // after, before???
        after(async()=>{
            await mongoose.connection.collection("users").deleteMany({email:"test@test.com"})
        })
    
        it("El endpoint /api/sessions/register en su método post, retorna un objeto con propiedad status con valor success, si mando un usuario valido", async()=>{
    
            let userMock={first_name:"mario", last_name:"santos", password:"123", email:"test@test.com"}
    
            let {body, status}=await requester.post("/api/sessions/register").send(userMock)
    
            // console.log(resultado)
            expect(status).to.be.eq(200)
            expect(body).to.have.property("status").and.to.be.eq("success")
            expect(body).to.have.property("payload")
            expect(isValidObjectId(body.payload)).to.be.true
    
        })
    
        it("El endpoint /api/sessions/register en su método post, retorna un objeto con propiedad status con valor error, si mando un usuario sin email", async()=>{
    
            // {
            //     "status": "error",
            //     "error": "Incomplete values"
            // }
    
            let userMock={first_name:"mario", last_name:"santos", password:"123"}
    
            let {body, status}=await requester.post("/api/sessions/register").send(userMock)
                                              
    
            // console.log(resultado)
            expect(status).to.be.eq(400)
            expect(body).to.have.property("status").and.to.be.eq("error")
            expect(body).to.have.property("error").and.to.be.eq("Incomplete values")
    
        })
    
    
    
    })

    describe("Test router pets", ()=>{
        it("El metodo get retorna un objeto con la property status con valor success", async()=>{
            let {body}=await requester.get("/api/pets")
                                      .set("Cookie", "prueba1=100; prueba2=200")

            expect(body).to.has.property("status").and.to.be.eq("success")
        })

        it("Prueba envio imagenes", async()=>{
            let petMock={
                name: "Roger", specie:"test", birthDate: new Date().toUTCString()
            }

            let {body}=await requester.post("/api/pets/withimage")
                                      .field("name", petMock.name)
                                      .field("specie", petMock.specie)
                                      .field("birthDate", petMock.birthDate)
                                      .attach("image", "../img-roger.jpg")

            console.log(body)

            // expect

        })
    })

})

