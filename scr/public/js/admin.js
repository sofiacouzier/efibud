
const deleteUser = document.getElementById('expired');
const seeUsers = document.getElementById('users');


deleteUser.addEventListener('click', async (event) => {

    event.preventDefault();


    const response = await fetch(`/api/users`, {
        method: 'DELETE'
    });


});

seeUsers.addEventListener('click', async (event) => {

    event.preventDefault();
    console.log("que")

    await fetch(`/api/users/`, {
        method: 'GET'
    }).then((response) => {
        return response.json();
    }).then((data) => {
        let users = data;
        console.log(users)

        const containerElement = document.getElementById('usuarios-container');

        // Limpia el contenedor antes de agregar nuevos usuarios
        containerElement.innerHTML = '';

        // Agrega cada usuario al contenedor
        users.forEach(user => {
            const userContainer = document.createElement('div');

            const nombreElement = document.createElement('h1');
            nombreElement.innerHTML = `${user.first_name} ${user.last_name}`;
            userContainer.appendChild(nombreElement);

            const idElement = document.createElement('h3');
            idElement.innerHTML = `ID: ${user._id}`;
            userContainer.appendChild(idElement);

            const roleElement = document.createElement('h5');
            roleElement.innerHTML = `Rol: ${user.role}`;
            userContainer.appendChild(roleElement);

            const emailElement = document.createElement('h4');
            emailElement.innerHTML = `Email: ${user.email}`;
            userContainer.appendChild(emailElement);

            // Agrega el contenedor del usuario al contenedor principal
            containerElement.appendChild(userContainer);
        });


    })


});