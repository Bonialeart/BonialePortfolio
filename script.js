document.addEventListener('DOMContentLoaded', () => {
  // Almacenar la posición anterior del scroll
  let lastScroll = 0;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Obtener la dirección del scroll
      const currentScroll = window.pageYOffset;
      const scrollingDown = currentScroll > lastScroll;
      lastScroll = currentScroll;

      const element = entry.target;
      const isImage = element.classList.contains('fade-slide-right');
      const isText = element.classList.contains('fade-slide-left');
      
      if (entry.isIntersecting) {
        // Añadir visibilidad con delay para la imagen
        if (isImage) {
          setTimeout(() => {
            element.classList.add('visible');
            element.classList.remove('fade-up', 'fade-down');
          }, 100);
        }
        // Añadir visibilidad con delay para el texto
        if (isText) {
          setTimeout(() => {
            element.classList.add('visible');
            element.classList.remove('fade-up', 'fade-down');
            
            const title = element.querySelector('.about-title');
            const text = element.querySelector('.reveal-text');
            
            if (title) title.classList.add('visible');
            if (text) text.classList.add('visible');
          }, 300);
        }
      } else {
        // Remover visibilidad cuando sale del viewport
        if (isImage) {
          element.classList.remove('visible');
          element.classList.add(scrollingDown ? 'fade-down' : 'fade-up');
        }
        if (isText) {
          element.classList.remove('visible');
          element.classList.add(scrollingDown ? 'fade-down' : 'fade-up');
          
          const title = element.querySelector('.about-title');
          const text = element.querySelector('.reveal-text');
          
          if (title) title.classList.remove('visible');
          if (text) text.classList.remove('visible');
        }
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '-50px'
  });

  // Observar los elementos
  document.querySelectorAll('.fade-slide-right, .fade-slide-left').forEach(el => {
    observer.observe(el);
  });
}); 