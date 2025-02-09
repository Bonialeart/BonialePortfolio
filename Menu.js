document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active'); // Activa/desactiva la animación del botón
        mainNav.classList.toggle('active');   // Muestra/oculta el menú
    });
});