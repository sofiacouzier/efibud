const form = document.getElementById('loginForm');

form.addEventListener('submit', async (event) => {

    event.preventDefault();
    const data = new FormData(form);

    const obj = {};
    data.forEach((value, key) => (obj[key] = value));
    const response = await fetch('/api/sessions/login', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.status === 200) {
        //redirijo al login
        //muestro modal
        window.location.replace('/');
    }
});
