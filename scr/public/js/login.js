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

    console.log(response)

    window.location.replace("/login")

});

