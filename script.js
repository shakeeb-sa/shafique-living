     document.addEventListener('DOMContentLoaded', () => {
        /* ==== HERO SLIDESHOW ==== */
        const slides = document.querySelectorAll('.hero-slide');
        if (slides.length > 0) {
          let currentSlide = 0;
          const showSlide = (index) => {
            slides.forEach((slide, i) => {
              slide.classList.remove('active');
              if (i === index) {
                slide.classList.add('active');
              }
            });
          };
          const nextSlide = () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
          };
          // Start the slideshow
          setInterval(nextSlide, 5000); // Change slide every 5 seconds
          showSlide(currentSlide); // Show the initial slide
        }
        /* ==== STICKY HEADER ==== */
        const header = document.getElementById('main-header');
        // Check if the header element exists before adding event listener
        if (header) {
          window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
              header.classList.add('scrolled');
            } else {
              header.classList.remove('scrolled');
            }
          });
        }
        /* ==== WHATSAPP POPUP ==== */
        const whatsappPopup = document.getElementById('whatsapp-popup');
        const closePopupBtn = document.getElementById('popup-close-btn');
        // Show popup after a 3-second delay
        if (whatsappPopup) {
          setTimeout(() => {
            whatsappPopup.classList.add('show');
          }, 3000);
        }
        // Close popup when the close button is clicked
        if (closePopupBtn) {
          closePopupBtn.addEventListener('click', () => {
            whatsappPopup.classList.remove('show');
          });
        }
        /* ==== MOBILE NAVIGATION ==== */
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        const menuCloseBtn = document.getElementById('menu-close-btn'); // **FIX**: Get the dedicated close button
        const navLinks = document.querySelectorAll('.nav-menu a');
        // Ensure all necessary mobile nav elements exist
        if (navMenu && navToggle && menuCloseBtn) {
          const icon = navToggle.querySelector('i');
          // Function to open the menu
          const openMenu = () => {
            navMenu.classList.add('show-menu');
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            navToggle.setAttribute('aria-expanded', 'true');
          };
          // Function to close the menu
          const closeMenu = () => {
            navMenu.classList.remove('show-menu');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            navToggle.setAttribute('aria-expanded', 'false');
          };
          // Event listener for the main toggle button (hamburger)
          navToggle.addEventListener('click', () => {
            if (navMenu.classList.contains('show-menu')) {
              closeMenu();
            } else {
              openMenu();
            }
          });
          // **FIX**: Add event listener for the dedicated 'X' close button inside the menu
          menuCloseBtn.addEventListener('click', closeMenu);
          // Add event listener to each nav link to close the menu on click
          navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
          });
        }
      });