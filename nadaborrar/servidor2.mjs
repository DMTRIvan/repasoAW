import express from 'express'


const app = express()

app.get('/api/v1/clasicos', async (req,res)=>{
    try{
        let rutaLibro = await fetch('https://stephen-king-api.onrender.com/api/books')
        const datosLibro = await rutaLibro.json()


        let rutaVinos = await fetch('http://localhost:3000/api/v1/vinos')
        const datosVinos = await rutaVinos.json()

        // console.log('Datos de vinos obtenidos:', datosVinos);
        
        const filtrado = datosLibro.data.map((libro)=>{
            const vinoAleatorio = datosVinos.vinos_argentinos[Math.floor(Math.random() * datosVinos.vinos_argentinos.length)];
            const objeto = {
                id: libro.id,
                year : libro.Year,
                title : libro.Title,
                ISBN: libro.ISBN,  
                vino: {
                    tipo_uva: vinoAleatorio.tipo_uva,
                    provincia: vinoAleatorio.provincia,
                    centimetros_cubicos: vinoAleatorio.centimetros_cubicos,
                    bodega: vinoAleatorio.bodega,
                    nombre_vino: vinoAleatorio.nombre_vino
                }  
            }
            return objeto
        })
        //console.log(filtrado)
        res.send(filtrado);
    }
    catch(error){
        console.error('Error al obtener datos:', error);
        res.status(500).send('Error interno del servidor');
    }
})

app.get('/api/v1/clasicos/:id', async (req,res)=>{
    const { id } = req.params;
    try{
        
        let rutaLibro = await fetch(`https://stephen-king-api.onrender.com/api/book/${id}`)
        const datosLibro = await rutaLibro.json()
        
        //console.log('Datos de vinos obtenidos:', datosLibro);
    
        let rutaVinos = await fetch('http://localhost:3000/api/v1/vinos')
        const datosVinos = await rutaVinos.json()


        const vinoAleatorio = datosVinos.vinos_argentinos[Math.floor(Math.random() * datosVinos.vinos_argentinos.length)];


        const filtrado = {
                id: datosLibro.data.id,
                year : datosLibro.data.Year,
                title : datosLibro.data.Title,
                ISBN: datosLibro.data.ISBN, 
                vino: {
                    tipo_uva: vinoAleatorio.tipo_uva,
                    provincia: vinoAleatorio.provincia,
                    centimetros_cubicos: vinoAleatorio.centimetros_cubicos,
                    bodega: vinoAleatorio.bodega,
                    nombre_vino: vinoAleatorio.nombre_vino
                }           
        };

        res.send(filtrado);

    }catch(error){
        console.error('Error al obtener datos:', error);
        res.status(500).send('Error interno del servidor');
    }
   
})



app.listen(4321)



