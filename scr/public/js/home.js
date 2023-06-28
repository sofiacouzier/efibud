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


const logoutButton = document.getElementById('logout');

function logout() {
    // Elimina el token de acceso del almacenamiento local
    localStorage.removeItem('accessToken');

    // Redirige a la página de inicio de sesión o a la página deseada
    window.location.href = 'login'; // Reemplaza 'login.html' con la página que corresponda
}


logoutButton.addEventListener('click', logout);

