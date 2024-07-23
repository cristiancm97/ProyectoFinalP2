document.addEventListener('DOMContentLoaded', function() {
  // Llamar a readUser al cargar la página
  readUser();

  // Botón Enviar
  document.getElementById('form-panelAdmin-empleado').addEventListener('submit', function(event) {
      event.preventDefault(); // Evitar que se envíe el formulario de manera predeterminada

      // Obtener los valores de los inputs
      var nombre = document.getElementById('nombre').value;
      var apellido = document.getElementById('apellido').value;
      var telefono = document.getElementById('telefono').value;
      var email = document.getElementById('email').value;
      var usuario = document.getElementById('usuario').value;
      var contrasena = document.getElementById('contrasena').value;

      // Guardar los valores en un objeto
      var user = {
          nombre: nombre,
          apellido: apellido,
          telefono: telefono,
          email: email,
          usuario: usuario,
          contrasena: contrasena
      };

      // Llamar a la función para enviar el objeto user
      addUser(user);
  });

  // Enviar un empleado
  function addUser(user) {
      fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
      })
      .then(response => {
          if (response.ok) {
              return response.json(); // Convierte la respuesta en JSON
          } else {
              throw new Error('Error en la solicitud');
          }
      })
      .then(() => {
          readUser(); // Actualiza la lista de empleados
      })
      .catch(error => {
          console.error('Error:', error);
      });
  }

  // Obtener empleados
  function readUser() {
      fetch('http://localhost:3000/users', {
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
          mostrarUsers(data); // Muestra los empleados en la página
      })
      .catch(error => {
          console.error('Error:', error); // Muestra el error en la consola
      });
  }

  // Mostrar los empleados
  function mostrarUsers(users) {
      var usersList = document.getElementById('users-list');
      usersList.innerHTML = ''; // Limpiar la lista antes de agregar los empleados

      users.forEach(user => {
          var li = document.createElement('li');
          li.textContent = `${user.nombre} ${user.apellido} | Teléfono: ${user.telefono} | Email: ${user.email} | Usuario: ${user.usuario}`;
          
          // Crear contenedor para los botones
          var actions = document.createElement('div');
          actions.className = 'user-actions';

          // Crear botón de editar
          var editButton = document.createElement('button');
          editButton.textContent = 'Editar';
          editButton.onclick = function() {
              editUser(user.id); // Llama a la función de edición con el ID del empleado
          };

          // Crear botón de eliminar
          var deleteButton = document.createElement('button');
          deleteButton.textContent = 'Eliminar';
          deleteButton.onclick = function() {
              deleteUser(user.id); // Llama a la función de eliminación con el ID del empleado
          };

          // Añadir los botones al contenedor
          actions.appendChild(editButton);
          actions.appendChild(deleteButton);

          // Añadir el contenedor de acciones al ítem de la lista
          li.appendChild(actions);

          // Añadir el ítem a la lista de empleados
          usersList.appendChild(li);
      });
  }

  // Editar un empleado
  function editUser(id) {
      // Obtener los datos actuales del empleado
      fetch(`http://localhost:3000/users/${id}`)
          .then(response => response.json())
          .then(user => {
              // Usar prompt para obtener nuevos valores de cada atributo
              let newNombre = prompt('Ingrese el nuevo nombre:', user.nombre);
              let newApellido = prompt('Ingrese el nuevo apellido:', user.apellido);
              let newTelefono = prompt('Ingrese el nuevo número de teléfono:', user.telefono);
              let newEmail = prompt('Ingrese el nuevo email:', user.email);
              let newUsuario = prompt('Ingrese el nuevo usuario:', user.usuario);
              let newContrasena = prompt('Ingrese la nueva contraseña:', user.contrasena);

              // Crear el objeto actualizado
              let updatedUser = {
                  nombre: newNombre,
                  apellido: newApellido,
                  telefono: newTelefono,
                  email: newEmail,
                  usuario: newUsuario,
                  contrasena: newContrasena
              };

              // Enviar la información actualizada mediante una petición PUT
              return fetch(`http://localhost:3000/users/${id}`, {
                  method: 'PUT',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(updatedUser)
              });
          })
          .then(response => {
              if (response.ok) {
                  alert('Empleado actualizado correctamente');
                  readUser(); // Actualiza la lista de empleados
              } else {
                  throw new Error('Error al actualizar el empleado');
              }
          })
          .catch(error => {
              console.error('Error:', error);
              alert('Error al actualizar el empleado');
          });
  }

  // Eliminar un empleado
  function deleteUser(id) {
      fetch(`http://localhost:3000/users/${id}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then(response => {
          if (response.ok) {
              // Actualiza la lista de empleados después de eliminar
              readUser();
          } else {
              throw new Error('Error al eliminar el empleado');
          }
      })
      .catch(error => {
          console.error('Error:', error);
      });
  }

  document.getElementById('logout-panelAdmin').addEventListener('click', function() {
      window.location.href = 'login.html';
      alert("Sesión cerrada");
  });
});


