 document.addEventListener("DOMContentLoaded", () => {
  // Código para el formulario de contacto
  const form = document.querySelector("#contactForm"); // Asegúrate de que el formulario tenga un ID

  if (form) { // Verificamos si el elemento form existe en la página
    form.addEventListener("submit", function(event) {
      console.log("preventDefault ejecutado");
      event.preventDefault(); // Evita el envío predeterminado del formulario

      const nombre = document.querySelector('#name').value;
      const email = document.querySelector('#email').value;
      const mensaje = document.querySelector('#message').value;

      // Envía los datos al backend usando fetch
      fetch('http://localhost:3000/enviar-correo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre: nombre,
          email: email,
          mensaje: mensaje
        })
      })
      .then(response => {
        if (response.ok) {
          // El correo se envió correctamente
          alert('Mensaje enviado correctamente!');
          form.reset(); // Limpia el formulario
        } else {
          // Hubo un error al enviar el correo
          alert('Hubo un error al enviar el mensaje. Inténtalo de nuevo más tarde.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Hubo un error al enviar el mensaje. Inténtalo de nuevo más tarde.');
      });
    });
  }
});