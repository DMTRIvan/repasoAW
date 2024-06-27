const traerProductos = async () => {
    try {
        const contenedor = document.getElementById('productos')
        const datosProductos = await fetch('https://rickandmortyapi.com/api/character')
        const datosJSON = await datosProductos.json()
        console.log(datosJSON);

        const personajes = datosJSON.results

        let HTML = '';
        personajes.forEach((producto) => {
            HTML += `
            <article>
                <ul>
                    <li class="productos-nombre">Nombre: ${producto.name}</li>
                    <li class="productos-nombre">Marca: ${producto.status}</li>
                    <li class="productos-nombre">Categoria: ${producto.species}</li>
                    <li class="productos-nombre">Categoria: ${producto.image}</li>
                    <img src="${producto.image}" alt="nada">
                </ul>
            </article>
            `;
        })
        contenedor.innerHTML = HTML;
    } catch (error) {
        console.log(error)
    }
}
traerProductos();