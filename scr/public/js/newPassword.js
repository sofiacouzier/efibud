const form = document.getElementById('newForm');
const urlParams = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop)
})

form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => obj[key] = value);
    obj.token = urlParams.token;
    const response = await fetch('/api/sessions/newPassword', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    })


})