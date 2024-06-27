// modulo cors()
// modulo helmet()

// ******************
// Actividad
// ******************
// Crear una API que filtre otra api para simplificar los contenidos
// a entregar a un cliente
// - Utilizar la api rick&morty -> https://rickandmortyapi.com/api/character
// - Analizar el formato entregado para poder desarrollar el script
// - Objtener todos los personajes via fetch()
// - Los personajes se deben cargar en memoria una sola vez al inicio del servidor
// - Mapear los personajes y crear un nuevo OBJETO solo las siguientes propiedades: "id", "name", "status", "species", el resto no incluirlas.
// - Crear un endpoint "/personajes" que devuelva el JSON
// - Crear un endpoint en el que se pueda consultar por "species"
// - Investigar el método json() de express

import express from 'express'

// *************************
process.env.PUERTO = 3000
// *************************

const PUERTO = process.env.PUERTO || 3000


const servidor = express();

// 1 - Crear una funcion que obtenga los datos de la api
// URL API: https://rickandmortyapi.com/api/character
let datosApi;
// Funcion -> cargar los datos en datosApi -> convertirlos a un OBJETO JAVASCRIPT
async function obtenerDatos(){
    try{
        // intentamos traer los datos
        const datos = await fetch('https://rickandmortyapi.com/api/character')
        const datosJSON = await datos.json()
        // obtenemos los personajes
        // personajes es un arreglo
        const personajes = datosJSON.results
        // Transformar los datos con .map
        
        // 2 - Utilizar .map() para contruir un nuevo arreglo SOLO con los datos requeridos
        // "id", "name", "status", "species", el resto no incluirlas.
        const nuevoArregloPersonajes = personajes.map((personaje)=>{
            const objetoPersonaje = {
                id: personaje.id,
                name: personaje.name,
                status: personaje.status,
                species: personaje.species
            }
            return objetoPersonaje
        })
        // Crear el JSON
        datosApi = `
            {
                "personajes":[${JSON.stringify(nuevoArregloPersonajes)}]
            }
        `
        console.log(datosApi)
    }catch(error){
        console.error(error)
    }
}
obtenerDatos()

// 3 - Contruir la ruta /personajes para enviar los personajes ya modificados al cliente



servidor.listen(PUERTO)
