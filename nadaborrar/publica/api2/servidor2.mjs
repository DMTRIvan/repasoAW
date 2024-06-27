import { createServer } from 'node:http'; 
import { gestionarLibros } from './funciones.mjs';

const PUERTO = 3000;

const servidor = createServer(async (peticion, respuesta)=>{
    if(peticion.method === 'GET'){ // Si la petición es de tipo GET entra en este if
        if(peticion.url === "/api/v1/vinos"){ // Si la url de la petición es /productos se llama a la función gestionarProductos
            gestionarLibros(respuesta)
        }
    }else{ // Si la petición no es de tipo GET, POST, PUT, OPTIONS o DELETE se llama a la función fallback
        fallback(respuesta) 
    }
})

// El servidor escucha en el puerto definido y muestra un mensaje en consola con la url del servidor
servidor.listen(PUERTO, ()=>{
    console.log(`http://localhost:${PUERTO}/productos`);
});