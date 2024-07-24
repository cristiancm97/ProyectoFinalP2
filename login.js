// Obtener el formulario por su id
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que se envíe el formulario de manera predeterminada

    // Obtener los valores de los inputs
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Llamar a la función para verificar el usuario
    verificarUser(username, password);
});

// Función para verificar el usuario
function verificarUser(username, password) {
    fetch('http://localhost:3000/users')
        .then(response => response.json()) // Convertir la respuesta en JSON
        .then(users => {
            // Buscar el usuario con el nombre de usuario y contraseña proporcionados
            const user = users.find(user => user.usuario === username && user.contrasena === password);

            if (user) {
                // Verificar el rol del usuario y redireccionar
                if (user.role === 'admin') {
                    window.location.href = 'menuAdmin.html'; // Redireccionar a la página del administrador
                } else if (user.role === 'empleado') {
                    window.location.href = 'menuEmpleado.html'; // Redireccionar a la página del empleado
                } else {
                    alert('Rol de usuario desconocido');
                }
            } else {
                alert('Usuario y/o contraseña incorrectos');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al verificar el usuario');
        });
}

