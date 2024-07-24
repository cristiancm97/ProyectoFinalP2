document.addEventListener('DOMContentLoaded', function() {
    // Llamar a readGenre al cargar la página
    readGenre();

    // Botón Enviar
    document.getElementById('form-panelAdmin-autor').addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar que se envíe el formulario de manera predeterminada

        // Obtener los valores de los inputs
        var genero = document.getElementById('genero').value;
        var descripcion = document.getElementById('descripcion').value;

        // Guardar los valores en un objeto
        var genre = {
            genero: genero,
            descripcion: descripcion
        };

        // Llamar a la función para enviar el objeto genre
        addGenre(genre);
    });

    // Enviar un género
    function addGenre(genre) {
        fetch('http://localhost:3000/genres', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(genre)
        })
        .then(response => {
            if (response.ok) {
                return response.json(); // Convierte la respuesta en JSON
            } else {
                throw new Error('Error en la solicitud');
            }
        })
        .then(() => {
            readGenre(); // Actualiza la lista de géneros
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // Obtener géneros
    function readGenre() {
        fetch('http://localhost:3000/genres', {
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
            mostrarGenres(data); // Muestra los géneros en la página
        })
        .catch(error => {
            console.error('Error:', error); // Muestra el error en la consola
        });
    }

    // Mostrar los géneros
    function mostrarGenres(genres) {
        var genresList = document.getElementById('generos-list');
        genresList.innerHTML = ''; // Limpiar la lista antes de agregar los géneros

        genres.forEach(genre => {
            var li = document.createElement('li');
            li.textContent = `${genre.genero} | Descripcion: ${genre.descripcion}`;
            
            // Crear contenedor para los botones
            var actions = document.createElement('div');
            actions.className = 'genre-actions';

            // Crear botón de editar
            var editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.className = 'edit';
            editButton.onclick = function() {
                editGenre(genre.id); // Llama a la función de edición con el ID del género
            };

            // Crear botón de eliminar
            var deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.className = 'delete';
            deleteButton.onclick = function() {
                deleteGenre(genre.id); // Llama a la función de eliminación con el ID del género
            };

            // Añadir los botones al contenedor
            actions.appendChild(editButton);
            actions.appendChild(deleteButton);

            // Añadir el contenedor de acciones al ítem de la lista
            li.appendChild(actions);

            // Añadir el ítem a la lista de géneros
            genresList.appendChild(li);
        });
    }

    // Editar un género
    function editGenre(id) {
        // Obtener los datos actuales del género
        fetch(`http://localhost:3000/genres/${id}`)
            .then(response => response.json())
            .then(genre => {
                // Usar prompt para obtener nuevos valores de cada atributo
                let newGenero = prompt('Ingrese el nuevo nombre del género:', genre.genero);
                let newDescripcion = prompt('Ingrese la nueva biografía:', genre.descripcion);

                // Crear el objeto actualizado
                let updatedGenre = {
                    genero: newGenero,
                    descripcion: newDescripcion
                };

                // Enviar la información actualizada mediante una petición PUT
                return fetch(`http://localhost:3000/genres/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedGenre)
                });
            })
            .then(response => {
                if (response.ok) {
                    alert('Género actualizado correctamente');
                    readGenre(); // Actualiza la lista de géneros
                } else {
                    throw new Error('Error al actualizar el género');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al actualizar el género');
            });
    }

    // Eliminar un género
    function deleteGenre(id) {
        fetch(`http://localhost:3000/genres/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Actualiza la lista de géneros después de eliminar
                readGenre();
            } else {
                throw new Error('Error al eliminar el género');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // Añadir eventos para botones fijos
    document.getElementById('menuButton').addEventListener('click', function() {
        window.location.href = 'menuEmpleado.html';
    });

    document.getElementById('logoutButton').addEventListener('click', function() {
        window.location.href = 'login.html';
        alert("Sesión cerrada");
    });
});