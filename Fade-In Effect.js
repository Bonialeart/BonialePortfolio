document.addEventListener('DOMContentLoaded', function() {
    const projectItems = document.querySelectorAll('.project-item');

    function fadeInOnScroll() {
      projectItems.forEach(item => {
        const itemPosition = item.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2; // Adjust as needed

        if (itemPosition < screenPosition) {
          item.classList.add('fade-in');
        } else {
          item.classList.remove('fade-in'); // Allow fade-out when scrolling back up
        }
      });
    }

    window.addEventListener('scroll', fadeInOnScroll);
    fadeInOnScroll(); // Trigger on initial load
  });