document.getElementById('card-libro').addEventListener('click', function() {
    window.location.href = 'empleadoLibro.html';
});

document.getElementById('card-genero').addEventListener('click', function() {
    window.location.href = 'empleadoGenero.html';
});

document.getElementById('card-autor').addEventListener('click', function() {
    window.location.href = 'empleadoAutor.html';
});

document.getElementById('logoutButton').addEventListener('click', function() {
    window.location.href = 'login.html';
    alert("Sesión cerrada");
});