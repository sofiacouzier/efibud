
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
const agregarCarrito = document.getElementById('productos')


agregarCarrito.addEventListener('click', async (event) => {
    if (event.target.classList.contains('agregar')) {
        let prodId = event.target.dataset.id
        console.log("contenido de prodId:", prodId)
        console.log(typeof prodId)

        const obj = { prodId };
        try {
            const response = await fetch('/api/cart/agregar', {
                method: 'POST',
                body: JSON.stringify(obj),
                headers: {
                    'Content-Type': 'application/json',
                },

            })
        } catch (error) {
            console.error(error);
        }
    }
});

