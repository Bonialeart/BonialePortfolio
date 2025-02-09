javascript: (() => {
    // Selecciona todos los elementos que son contenedores de la imagen y el <h3>
    const galleryItems = document.querySelectorAll('.gallery-item');
  
    galleryItems.forEach(item => {
      const imgElement = item.querySelector('img'); // Encuentra la imagen dentro del item
      const titleElement = item.querySelector('h3'); // Encuentra el <h3> dentro del item
  
      if (imgElement && titleElement) { // Asegúrate de que tanto la imagen como el <h3> existan
        const titleText = titleElement.textContent.trim(); // Obtiene el texto del <h3> y elimina espacios en blanco al inicio/final
  
        // Crea un elemento span para mostrar el texto del título
        const filenameSpan = document.createElement('span');
        filenameSpan.textContent = titleText; // Usa el texto del <h3>
        filenameSpan.style.position = 'absolute';
        filenameSpan.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        filenameSpan.style.color = 'white';
        filenameSpan.style.padding = '5px';
        filenameSpan.style.borderRadius = '5px';
        filenameSpan.style.fontSize = '0.8em';
        filenameSpan.style.bottom = '5px';
        filenameSpan.style.left = '50%';
        filenameSpan.style.transform = 'translateX(-50%)';
        filenameSpan.style.zIndex = '1';
        filenameSpan.style.visibility = 'hidden';
        filenameSpan.style.opacity = '0';
        filenameSpan.style.transition = 'visibility 0s, opacity 0.3s linear';
  
        item.style.position = 'relative';
        item.appendChild(filenameSpan);
  
        // Evento para mostrar el título al pasar el mouse
        item.addEventListener('mouseover', () => {
          filenameSpan.style.visibility = 'visible';
          filenameSpan.style.opacity = '1';
        });
  
        // Evento para ocultar el título al quitar el mouse
        item.addEventListener('mouseout', () => {
          filenameSpan.style.visibility = 'hidden';
          filenameSpan.style.opacity = '0';
        });
      }
    });
  })();