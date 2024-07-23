document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma tradicional
    window.location.href = 'menuAdmin.html'; // Redirige a la otra página
});
