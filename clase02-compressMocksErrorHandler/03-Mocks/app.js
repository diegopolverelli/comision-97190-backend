import {fakerES as fa} from "@faker-js/faker"

// for(let i=0; i<10; i++){
//     console.log(fa.animal.dog())
//     console.log(fa.commerce.product())
//     console.log(fa.airline.airplane())
//     let nombre=fa.person.firstName("female")
//     let apellido=fa.person.lastName()

//     console.log(`${nombre} ${apellido}`)
//     console.log(fa.internet.email({firstName: nombre, lastName: apellido, provider: "coderhouse.com"}))
// }

const generarCliente=()=>{
    let id=fa.database.mongodbObjectId()
    let nombre=fa.person.firstName("female")
    let apellido=fa.person.lastName()
    let email=fa.internet.email({firstName: nombre, lastName: apellido, provider: "coderhouse.com"})
    let domicilio=fa.location.city()

    return {_id: id, nombre, apellido, email, domicilio}
}

for(let i=0; i<10; i++){
    console.log(generarCliente())

}