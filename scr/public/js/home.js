
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
