
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
logoutButton.addEventListener('click', async () => {
    try {
        const response = await fetch('/logout', {
            method: 'DELETE',
        });
        if (response.status == 200) {
            window.location.replace('/login');
        }
    } catch (error) {
        console.error('Error al cerrar sesión:');
    }
});
const agregarCarrito = document.getElementById('agregar')


//arreglar
//logoutButton.addEventListener('click', window.location.redirect('/login'));

// probar: agregarCarrito.addEventListener('submit',)