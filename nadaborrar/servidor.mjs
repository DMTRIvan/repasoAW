import express from  'express';

const PUERTO = 3000;

const servidor = express();

// servidor.get('/', (peticion, respuesta, next) => {
//     respuesta.end(`Este es un midelwere`);
//     next();
// });

// servidor.use('/', (peticion, respuesta) => {
//     respuesta.send(`Se utilizó el verbo ${peticion.method}`);
// });

//Llama por defecto al index que este en la carpeta front
servidor.use(express.static('front'))

servidor.listen(PUERTO);