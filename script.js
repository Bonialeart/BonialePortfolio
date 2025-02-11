document.addEventListener('DOMContentLoaded', () => {
  // Implementar lazy loading para imágenes
  const lazyImages = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });
  
  lazyImages.forEach(img => imageObserver.observe(img));
  
  const header = document.querySelector('.main-header');
  
  // Forzar la posición inicial del header
  const initializeHeader = () => {
    header.style.position = 'fixed';
    header.style.top = '2.5rem';
    
    // Ajustar para móviles
    if (window.innerWidth <= 768) {
      header.style.top = '1.5rem';
    }
  };

  // Ejecutar inmediatamente
  initializeHeader();

  const checkScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
      header.style.top = window.innerWidth <= 768 ? '1rem' : '1.5rem';
    } else {
      header.classList.remove('scrolled');
      header.style.top = window.innerWidth <= 768 ? '1.5rem' : '2.5rem';
    }
  };
  
  // Verificar estado inicial
  checkScroll();
  
  // Evento scroll con debounce
  window.addEventListener('scroll', () => {
    requestAnimationFrame(checkScroll);
  }, { passive: true });

  // Asegurar posición correcta después de la carga completa
  window.addEventListener('load', () => {
    initializeHeader();
    checkScroll();
  });

  // Ajustar en resize
  window.addEventListener('resize', () => {
    initializeHeader();
    checkScroll();
  });
  
  // Cargar recursos no críticos después del contenido principal
  const loadNonCritical = () => {
    // Cargar Instagram widget
    if (document.querySelector('.instagram-showcase')) {
      const script = document.createElement('script');
      script.src = "https://static.elfsight.com/platform/platform.js";
      script.defer = true;
      document.body.appendChild(script);
    }
    
    // Cargar efectos adicionales
    if ('IntersectionObserver' in window) {
      const reveals = document.querySelectorAll('.reveal');
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      });
      
      reveals.forEach(el => revealObserver.observe(el));
    }
  };
  
  // Ejecutar carga no crítica después del evento load
  if (document.readyState === 'complete') {
    loadNonCritical();
  } else {
    window.addEventListener('load', loadNonCritical);
  }

  // Almacenar la posición anterior del scroll
  let lastScroll = 0;
  const isMobile = window.innerWidth <= 768;

  const observer2 = new IntersectionObserver((entries) => {
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
    observer2.observe(el);
  });

  // Actualizar isMobile en resize
  window.addEventListener('resize', () => {
    isMobile = window.innerWidth <= 768;
  });
  
  // Efecto hover en elementos interactivos
  const interactiveElements = document.querySelectorAll('a, button, .project-item');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });

  // Efecto parallax suave
  document.addEventListener('mousemove', (e) => {
    const moveElements = document.querySelectorAll('.parallax');
    moveElements.forEach(element => {
      const speed = element.getAttribute('data-speed');
      const x = (window.innerWidth - e.pageX * speed) / 100;
      const y = (window.innerHeight - e.pageY * speed) / 100;
      element.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
  });
});

// Service Worker para cache
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => console.log('ServiceWorker registered'))
      .catch(err => console.log('ServiceWorker registration failed'));
  });
}

// Función para manejar la pantalla de carga
window.addEventListener('load', function() {
  setTimeout(function() {
    const loadingScreen = document.getElementById('loading-screen');
    const body = document.body;
    
    if (loadingScreen) {
      loadingScreen.style.opacity = '0';
      
      // Asegurarse de que el logo permanezca visible
      document.querySelector('.logo').style.opacity = '1';
      document.querySelector('.logo').style.visibility = 'visible';
      document.querySelector('.logo img').style.opacity = '1';
      document.querySelector('.logo img').style.visibility = 'visible';
      
      setTimeout(function() {
        loadingScreen.style.display = 'none';
      }, 500);
    }
  }, 1000);
}); 