//console.log('first')
const productos = document.getElementById("productos")

const socket = io()

socket.on("entregando productos", data => {
    let listadeprod = ""
    data.forEach(prod => {
        listadeprod += `<div class="product">
            <img class="img" src=${prod.thumbnail}>
                <h1 class="nombre">${prod.title}</h1>
                <h3 class="desc">${prod.description}</h3>
                <h5 class="code">code:${prod.code}</h5>
                <h4 class="desc">precio:${prod.price}</h4>
                <br />
        </div>`

    });
    productos.innerHTML = listadeprod
})

