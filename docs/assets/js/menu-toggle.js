// Hamburger Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const sidebar = document.querySelector('.sidebar');
  const menuOverlay = document.querySelector('.menu-overlay');

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', function() {
      hamburgerBtn.classList.toggle('active');
      sidebar.classList.toggle('active');
      menuOverlay.classList.toggle('active');
    });
  }

  // Close menu when overlay is clicked
  if (menuOverlay) {
    menuOverlay.addEventListener('click', function() {
      hamburgerBtn.classList.remove('active');
      sidebar.classList.remove('active');
      menuOverlay.classList.remove('active');
    });
  }

  // Close menu when a sidebar link is clicked
  const sidebarLinks = document.querySelectorAll('.sidebar a');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', function() {
      hamburgerBtn.classList.remove('active');
      sidebar.classList.remove('active');
      menuOverlay.classList.remove('active');
    });
  });
});
