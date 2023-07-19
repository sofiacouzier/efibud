
// const jwt = localStorage.getItem('accessToken');//traigo el token que esta en el front
// if (!jwt) window.location.replace('/login');


// fetch('/api/sessions/jwtProfile', {
//     method: 'GET',
//     headers: {
//         authorization: `Bearer ${jwt}`,
//     },
// })
//     .then((response) => response.json())
//     .then((result) => {
//         console.log(result);
//         const welcome = document.getElementById('welcome');
//         const email = document.getElementById('email');
//         welcome.innerHTML = `Hola, ${result.payload.name}`;
//         email.innerHTML = result.payload.email
//     });

//NECESITA ARREGLO
const logoutButton = document.getElementById('logout');
const agregarCarrito = document.getElementById('agregar')

function logout() {
    document.clearCookie('authToken');
    console.log("sesion eliminada")
    // Redirige a la página de inicio de sesión o a la página deseada
    window.location.href('/login')
}

//arreglar
logoutButton.addEventListener('click', logout);

// probar: agregarCarrito.addEventListener('submit',)