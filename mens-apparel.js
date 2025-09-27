w// Wait for the entire HTML document to be fully loaded and parsed
document.addEventListener('DOMContentLoaded', () => {

    // --- Sticky Header on Scroll ---
    const header = document.getElementById('main-header');
    
    // A scroll event listener on the window
    window.addEventListener('scroll', () => {
        // If the user has scrolled down more than 50 pixels
        if (window.scrollY > 50) {
            // Add the 'scrolled' class to the header
            header.classList.add('scrolled');
        } else {
            // Otherwise, remove the 'scrolled' class
            header.classList.remove('scrolled');
        }
    });

        // --- WhatsApp Popup Logic ---
    const popup = document.getElementById('whatsapp-popup');
    const closeBtn = document.getElementById('popup-close-btn');
    
    // Check if the popup element actually exists on the page
    if (popup) {
        let autoHideTimer; // Variable to hold our auto-hide timer

        // Function to show the popup
        const showPopup = () => {
            popup.classList.add('show');
            // Set a timer to automatically hide the popup after 5 seconds
            autoHideTimer = setTimeout(hidePopup, 5000);
        };

        // Function to hide the popup
        const hidePopup = () => {
            popup.classList.remove('show');
        }; 

        // Show the popup 2 seconds after the page loads
        setTimeout(showPopup, 2000);

        // Add event listener for the close button
        closeBtn.addEventListener('click', () => {
            hidePopup();
            // IMPORTANT: Clear the automatic timer if the user closes it manually
            clearTimeout(autoHideTimer);
        });
    }

        // --- Hero Section Slideshow ---
    const heroSlides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    
    // Check if there are slides to animate
    if (heroSlides.length > 0) {
        // Set an interval to switch slides. 
        // 4000ms = 4 seconds per slide. "2 section" is very fast, 
        // 4-5 seconds is usually better for a pleasant user experience.
        setInterval(() => {
            // Remove 'active' from the current slide
            heroSlides[currentSlide].classList.remove('active');
            
            // Move to the next slide, looping back to 0 if at the end
            currentSlide = (currentSlide + 1) % heroSlides.length;
            
            // Add 'active' to the new current slide
            heroSlides[currentSlide].classList.add('active');
        }, 4000); 
    }
});