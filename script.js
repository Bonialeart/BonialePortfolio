document.addEventListener('DOMContentLoaded', () => {
  // Almacenar la posición anterior del scroll
  let lastScroll = 0;
  const isMobile = window.innerWidth <= 768;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const currentScroll = window.pageYOffset;
      const scrollingDown = currentScroll > lastScroll;
      lastScroll = currentScroll;
      
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.classList.remove('fade-up', 'fade-down');
        
        if (entry.target.classList.contains('fade-slide-left')) {
          const title = entry.target.querySelector('.about-title');
          const text = entry.target.querySelector('.reveal-text');
          
          if (title) title.classList.add('visible');
          if (text) text.classList.add('visible');
        }
      } else {
        entry.target.classList.remove('visible');
        entry.target.classList.add(scrollingDown ? 'fade-down' : 'fade-up');
        
        if (entry.target.classList.contains('fade-slide-left')) {
          const title = entry.target.querySelector('.about-title');
          const text = entry.target.querySelector('.reveal-text');
          
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

  // Actualizar isMobile en resize
  window.addEventListener('resize', () => {
    isMobile = window.innerWidth <= 768;
  });
}); 