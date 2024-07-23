document.getElementById('card-empleado').addEventListener('click', function() {
    window.location.href = 'adminEmp.html';
});

document.getElementById('card-libro').addEventListener('click', function() {
    window.location.href = 'adminLibro.html';
});

document.getElementById('logout-menuAdmin').addEventListener('click', function() {
    window.location.href = 'login.html';
    alert("Sesión cerrada")
});
