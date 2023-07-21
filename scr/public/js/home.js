
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
agregarCarrito.addEventListener('click', async (event) => {
    const prodId = event.target.dataset.id
    console.log("contenido de prodId:", prodId)
    console.log(typeof prodId)
    try {
        const response = await fetch('/api/cart/aver', {
            method: 'POST',
            body: prodId,
            headers: {
                'Content-Type': 'application/json',
            },

        })

        console.log('Respuesta del servidor:', responseData); // Mostramos la respuesta del servidor en la consola
    } catch (error) {
        console.error(error);
    }

});

// probar: agregarCarrito.addEventListener('submit',)