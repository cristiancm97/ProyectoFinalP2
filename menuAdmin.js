document.getElementById('card-empleado').addEventListener('click', function() {
    window.location.href = 'adminEmp.html';
});

document.getElementById('card-libro').addEventListener('click', function() {
    window.location.href = 'adminLibro.html';
});

document.getElementById('card-genero').addEventListener('click', function() {
    window.location.href = 'adminGenero.html';
});

document.getElementById('card-autor').addEventListener('click', function() {
    window.location.href = 'adminAutor.html';
});

document.getElementById('logoutButton').addEventListener('click', function() {
    window.location.href = 'login.html';
    alert("Sesión cerrada");
});
