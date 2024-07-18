document.addEventListener('DOMContentLoaded', function() {
    const bookForm = document.getElementById('book-form');
    const bookTitle = document.getElementById('book-title');
    const bookAuthor = document.getElementById('book-author');
    const bookYear = document.getElementById('book-year');
    const bookList = document.getElementById('book-list');
  
    // Cargar libros al iniciar
    fetchBooks();
  
    // Manejar el envío del formulario
    bookForm.addEventListener('submit', function(e) {
      e.preventDefault();
      addBook(bookTitle.value, bookAuthor.value, bookYear.value);
      bookTitle.value = '';
      bookAuthor.value = '';
      bookYear.value = '';
    });
  
    // Cargar libros desde el servidor
    function fetchBooks() {
      fetch('http://localhost:3000/books')
        .then(response => response.json())
        .then(books => {
          bookList.innerHTML = '';
          books.forEach(book => {
            appendBook(book);
          });
        });
    }
  
    // Agregar nuevo libro al servidor
    function addBook(title, author, year) {
      fetch('http://localhost:3000/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, author, year })
      })
      .then(response => response.json())
      .then(book => {
        appendBook(book);
      });
    }
  
    // Agregar libro al DOM
    function appendBook(book) {
      const li = document.createElement('li');
      li.dataset.id = book.id;
      li.innerHTML = `
        ${book.title} - ${book.author} (${book.year})
        <button class="edit">Editar</button>
        <button class="delete">Eliminar</button>
      `;
      bookList.appendChild(li);
  
      // Manejar clic en el botón de eliminar
      li.querySelector('.delete').addEventListener('click', function() {
        deleteBook(book.id);
      });
  
      // Manejar clic en el botón de editar
      li.querySelector('.edit').addEventListener('click', function() {
        editBook(book);
      });
    }
  
    // Eliminar libro del servidor
    function deleteBook(id) {
      fetch(`http://localhost:3000/books/${id}`, {
        method: 'DELETE'
      })
      .then(() => {
        document.querySelector(`li[data-id='${id}']`).remove();
      });
    }
  
    // Editar libro
    function editBook(book) {
      const newTitle = prompt("Nuevo título:", book.title);
      const newAuthor = prompt("Nuevo autor:", book.author);
      const newYear = prompt("Nuevo año:", book.year);
      if (newTitle && newAuthor && newYear) {
        fetch(`http://localhost:3000/books/${book.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title: newTitle, author: newAuthor, year: newYear })
        })
        .then(response => response.json())
        .then(updatedBook => {
          const li = document.querySelector(`li[data-id='${updatedBook.id}']`);
          li.innerHTML = `
            ${updatedBook.title} - ${updatedBook.author} (${updatedBook.year})
            <button class="edit">Editar</button>
            <button class="delete">Eliminar</button>
          `;
          li.querySelector('.delete').addEventListener('click', function() {
            deleteBook(updatedBook.id);
          });
          li.querySelector('.edit').addEventListener('click', function() {
            editBook(updatedBook);
          });
        });
      }
    }
  });
  