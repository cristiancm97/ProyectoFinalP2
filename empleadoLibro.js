document.addEventListener('DOMContentLoaded', function() {
    // Llamar a readBook
    readBook();

    // Botón Enviar
    document.getElementById('form-libro').addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar que se envíe el formulario de manera predeterminada

        // Obtener los valores de los inputs
        var titulo = document.getElementById('titulo').value;
        var autor = document.getElementById('autor').value;
        var anio = document.getElementById('anio').value;
        var genero = document.getElementById('genero').value;

        // Guardar los valores en un objeto
        var book = {
            titulo: titulo,
            autor: autor,
            anio: anio,
            genero: genero
        };

        // Llamar a la función para enviar el objeto book
        addBook(book);
    });

    // Enviar un libro
    function addBook(book) {
        fetch('http://localhost:3000/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        })
        .then(response => {
            if (response.ok) {
                return response.json(); // Convierte la respuesta en JSON
            } else {
                throw new Error('Error en la solicitud');
            }
        });
    }

    // Obtener libros
    function readBook() {
        fetch('http://localhost:3000/books', {
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
            mostrarBooks(data); // Muestra los libros en la página
        })
        .catch(error => {
            console.error('Error:', error); // Muestra el error en la consola
        });
    }

    // Mostrar los libros
    function mostrarBooks(books) {
        var booksList = document.getElementById('books-list');
        booksList.innerHTML = ''; // Limpiar la lista antes de agregar los libros

        books.forEach(book => {
            var li = document.createElement('li');
            li.textContent = `${book.titulo} - ${book.autor} (${book.anio}) - Género: ${book.genero}`;

            // Crear contenedor para los botones
            var actions = document.createElement('div');
            actions.className = 'book-actions';

            // Crear botón de editar
            var editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.onclick = function() {
                editBook(book.id); // Llama a la función de edición con el ID del libro
            };

            // Crear botón de eliminar
            var deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.onclick = function() {
                deleteBook(book.id); // Llama a la función de eliminación con el ID del libro
            };

            // Añadir los botones al contenedor
            actions.appendChild(editButton);
            actions.appendChild(deleteButton);

            // Añadir el contenedor de acciones al ítem de la lista
            li.appendChild(actions);

            // Añadir el ítem a la lista de libros
            booksList.appendChild(li);
        });
    }

    // Editar un libro
    function editBook(id) {
        // Obtener los datos actuales del libro
        fetch(`http://localhost:3000/books/${id}`)
            .then(response => response.json())
            .then(book => {
                // Usar prompt para obtener nuevos valores de cada atributo
                let newTitulo = prompt('Ingrese el nuevo título:', book.titulo);
                let newAutor = prompt('Ingrese el nuevo autor:', book.autor);
                let newAnio = prompt('Ingrese el nuevo año de publicación:', book.anio);
                let newGenero = prompt('Ingrese el nuevo género:', book.genero);

                // Crear el objeto actualizado
                let updatedBook = {
                    titulo: newTitulo,
                    autor: newAutor,
                    anio: newAnio,
                    genero: newGenero
                };

                // Enviar la información actualizada mediante una petición PUT
                return fetch(`http://localhost:3000/books/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedBook)
                });
            })
            .then(response => {
                if (response.ok) {
                    alert('Libro actualizado correctamente');
                    readBook(); // Actualiza la lista de libros
                } else {
                    throw new Error('Error al actualizar el libro');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al actualizar el libro');
            });
    }

    // Eliminar un libro
    function deleteBook(id) {
        fetch(`http://localhost:3000/books/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Actualiza la lista de libros después de eliminar
                readBook();
            } else {
                throw new Error('Error al eliminar el libro');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    
});

document.getElementById('menuButton').addEventListener('click', function() {
    window.location.href = 'menuEmpleado.html';
});

document.getElementById('logoutButton').addEventListener('click', function() {
    window.location.href = 'login.html';
    alert("Sesión cerrada");
});