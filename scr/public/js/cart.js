const fin = document.getElementById('ticket')
const cid = fin.getAttribute('data')
fin.addEventListener('click', async (event) => {
    event.preventDefault()
    try {
        const response = await fetch(`/api/cart/${cid}/purchase`, {
            method: 'POST',

        });
        if (response.status == 200) {
            window.location.replace('/');
        }

    } catch (error) {
        console.error('Error al cerrar sesión:');
    }


})
