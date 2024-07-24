document.addEventListener('DOMContentLoaded', function() {
    // Llamar a readAutor al cargar la página
    readAutor();
  
    // Botón Enviar
    document.getElementById('form-panelAdmin-autor').addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar que se envíe el formulario de manera predeterminada
  
        // Obtener los valores de los inputs
        var nombre = document.getElementById('nombre').value;
        var fechaNacimiento = document.getElementById('fechaNacimiento').value;
        var biografia = document.getElementById('biografia').value;
  
        // Guardar los valores en un objeto
        var autor = {
            nombre: nombre,
            fechaNacimiento: fechaNacimiento,
            biografia: biografia
        };
  
        // Llamar a la función para enviar el objeto autor
        addAutor(autor);
    });
  
    // Enviar un autor
    function addAutor(autor) {
        fetch('http://localhost:3000/authors', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(autor)
        })
        .then(response => {
            if (response.ok) {
                return response.json(); // Convierte la respuesta en JSON
            } else {
                throw new Error('Error en la solicitud');
            }
        })
        .then(() => {
            readAutor(); // Actualiza la lista de autores
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
  
    // Obtener autores
    function readAutor() {
        fetch('http://localhost:3000/authors', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }) 
        .then(response => {
            if (response.ok) {
                return response.json(); // Convierte la respuesta en JSON
            } else {
                throw new Error('Error en la solicitud');
            }
        })
        .then(data => {
            mostrarAutores(data); // Muestra los autores en la página
        })
        .catch(error => {
            console.error('Error:', error); // Muestra el error en la consola
        });
    }
  
    // Mostrar los autores
    function mostrarAutores(autores) {
        var autoresList = document.getElementById('autores-list');
        autoresList.innerHTML = ''; // Limpiar la lista antes de agregar los autores
  
        autores.forEach(autor => {
            var li = document.createElement('li');
            li.textContent = `${autor.nombre} | Fecha de Nacimiento: ${autor.fechaNacimiento} | Biografía: ${autor.biografia}`;
            
            // Crear contenedor para los botones
            var actions = document.createElement('div');
            actions.className = 'autor-actions';
  
            // Crear botón de editar
            var editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.onclick = function() {
                editAutor(autor.id); // Llama a la función de edición con el ID del autor
            };
  
            // Crear botón de eliminar
            var deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.onclick = function() {
                deleteAutor(autor.id); // Llama a la función de eliminación con el ID del autor
            };
  
            // Añadir los botones al contenedor
            actions.appendChild(editButton);
            actions.appendChild(deleteButton);
  
            // Añadir el contenedor de acciones al ítem de la lista
            li.appendChild(actions);
  
            // Añadir el ítem a la lista de autores
            autoresList.appendChild(li);
        });
    }
  
    // Editar un autor
    function editAutor(id) {
        // Obtener los datos actuales del autor
        fetch(`http://localhost:3000/authors/${id}`)
            .then(response => response.json())
            .then(autor => {
                // Usar prompt para obtener nuevos valores de cada atributo
                let newNombre = prompt('Ingrese el nuevo nombre:', autor.nombre);
                let newFechaNacimiento = prompt('Ingrese la nueva fecha de nacimiento:', autor.fechaNacimiento);
                let newBiografia = prompt('Ingrese la nueva biografía:', autor.biografia);
  
                // Crear el objeto actualizado
                let updatedAutor = {
                    nombre: newNombre,
                    fechaNacimiento: newFechaNacimiento,
                    biografia: newBiografia
                };
  
                // Enviar la información actualizada mediante una petición PUT
                return fetch(`http://localhost:3000/authors/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedAutor)
                });
            })
            .then(response => {
                if (response.ok) {
                    alert('Autor actualizado correctamente');
                    readAutor(); // Actualiza la lista de autores
                } else {
                    throw new Error('Error al actualizar el autor');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al actualizar el autor');
            });
    }
  
    // Eliminar un autor
    function deleteAutor(id) {
        fetch(`http://localhost:3000/authors/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Actualiza la lista de autores después de eliminar
                readAutor();
            } else {
                throw new Error('Error al eliminar el autor');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
  
    document.getElementById('menuButton').addEventListener('click', function() {
        window.location.href = 'menuEmpleado.html';
    });
  
    document.getElementById('logoutButton').addEventListener('click', function() {
        window.location.href = 'login.html';
        alert("Sesión cerrada");
    });
  });