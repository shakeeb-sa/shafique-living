  /* ===================================================================
   Wait for the DOM to be fully loaded before running any scripts
=================================================================== */
document.addEventListener('DOMContentLoaded', () => {

    /* ==== HERO SLIDESHOW (Runs only if slideshow elements exist) ==== */
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
        showSlide(currentSlide);      // Show the initial slide
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

    // Show popup after a 3-second delay if it exists
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
    const menuCloseBtn = document.getElementById('menu-close-btn');
    const menuOverlay = document.querySelector('.menu-overlay'); // Assuming you add an overlay div
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Ensure all necessary mobile nav elements exist
    if (navMenu && navToggle && menuCloseBtn) {
        
        // Function to open the menu
        const openMenu = () => {
            navMenu.classList.add('show-menu');
            // Optional: Show overlay if it exists
            if(menuOverlay) menuOverlay.classList.add('show-overlay'); 
            navToggle.setAttribute('aria-expanded', 'true');
        };

        // Function to close the menu
        const closeMenu = () => {
            navMenu.classList.remove('show-menu');
             // Optional: Hide overlay if it exists
            if(menuOverlay) menuOverlay.classList.remove('show-overlay');
            navToggle.setAttribute('aria-expanded', 'false');
        };

        // Event listener for the main toggle button (hamburger)
        navToggle.addEventListener('click', () => {
            // If the menu is already shown, clicking the toggle should close it.
            if (navMenu.classList.contains('show-menu')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Event listener for the dedicated 'X' close button inside the menu
        menuCloseBtn.addEventListener('click', closeMenu);
        
        // Event listener for the overlay to close the menu
        if (menuOverlay) {
            menuOverlay.addEventListener('click', closeMenu);
        }

        // Add event listener to each nav link to close the menu on click
        // This is good UX for single-page applications or anchor links
        navLinks.forEach(link => {
            // Check if it's not the internal logo link inside the menu header
            if(!link.closest('.nav-menu-header')) {
                link.addEventListener('click', closeMenu);
            }
        });
    }
});