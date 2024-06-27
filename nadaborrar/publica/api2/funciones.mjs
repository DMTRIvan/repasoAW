import { join, parse } from 'node:path';

import { readFile, writeFile } from 'node:fs/promises';

let productosV1;

const leerArchivosJson = async()=>{
    try{
        const ruta = join('vinos.json'); // Definimos la ruta del archivo productos.json
        const datos = await readFile(ruta, 'utf-8'); // Leemos el archivo productos.json y almacenamos los datos en la variable datos
        productosV1 = JSON.parse(datos) // Convertimos los datos a un objeto JSON y los almacenamos en la variable productosV1
    }catch(error){
        console.log(error)
    }
}

const gestionarLibros = async(respuesta)=>{
    await leerArchivosJson(); // Llamamos a la función leerArchivosJson para leer el archivo productos.json
    if(productosV1){
        respuesta.setHeader('Access-Control-Allow-Origin', '*') // Permitimos el acceso a la API desde cualquier origen
        respuesta.setHeader('Content-Type', 'application/json;charset=utf-8')
        respuesta.statusCode=200
        respuesta.end(JSON.stringify(productosV1))
    }else{
        respuesta.setHeader('Content-Type', 'text/plain;charset=utf-8')
        respuesta.statusCode=404
        respuesta.end("No fue encontrado el recurso");
    }
}

export {gestionarLibros}