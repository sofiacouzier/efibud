console.log('first')
const nombre = document.getElementById("nombre")
const formulario = document.getElementById('form')
try {
    console.log(formulario)
} catch (error) {
    console.log(error)
}

formulario.addEventListener("submit", (evt) => {
    evt.preventDefault()
    console.log("hols")
})

const socket = io()
