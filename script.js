// This is your main script file (e.g., script.js)

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. HEADER SCROLL EFFECT ---
  const header = document.getElementById('main-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // --- 2. MOBILE NAVIGATION ---
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const menuCloseBtn = document.getElementById('menu-close-btn');
  const overlay = document.querySelector('.menu-overlay');

  const toggleMenu = (show) => {
    navMenu.classList.toggle('show-menu', show);
    if (overlay) overlay.classList.toggle('show-overlay', show);
    document.body.classList.toggle('no-scroll', show);
  };

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => toggleMenu(true));
  }
  if (menuCloseBtn) {
    menuCloseBtn.addEventListener('click', () => toggleMenu(false));
  }
  if (overlay) {
    overlay.addEventListener('click', () => toggleMenu(false));
  }

  // --- 3. HERO SLIDESHOW ---
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length > 1) {
    let currentSlide = 0;
    const showSlide = (index) => {
      slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
    };
    const nextSlide = () => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    };
    setInterval(nextSlide, 7000);
    showSlide(0);
  }

  // --- 4. WHATSAPP POPUP ---
  const whatsappPopup = document.getElementById('whatsapp-popup');
  const popupCloseBtn = document.getElementById('popup-close-btn');
  if (whatsappPopup) {
    setTimeout(() => {
      whatsappPopup.classList.add('show');
    }, 5000);
    if (popupCloseBtn) {
      popupCloseBtn.addEventListener('click', () => {
        whatsappPopup.classList.remove('show');
      });
    }
  }

  // --- 5. SCROLL-TRIGGERED FADE-IN ANIMATIONS ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll('.category-card, .intro-section').forEach(el => {
    el.classList.add('fade-in-up');
    observer.observe(el);
  });

  // ===================================================================
  // --- 6. DYNAMIC PRODUCT LOADER WITH PAGINATION (UPDATED) ---
  // ===================================================================
  const productGrid = document.getElementById('product-grid-container');

  if (productGrid) {
    // --- PAGINATION CONFIGURATION ---
    const PRODUCTS_PER_PAGE = 30;

    // --- GET CURRENT PAGE FROM URL (e.g., ?page=2) ---
    const urlParams = new URLSearchParams(window.location.search);
    let currentPage = parseInt(urlParams.get('page')) || 1;

    // --- MERGE ALL PRODUCT DATA ---
    let allProducts = {};
    if (typeof beddingProducts !== 'undefined') allProducts = { ...allProducts, ...beddingProducts };
    if (typeof menProducts !== 'undefined') allProducts = { ...allProducts, ...menProducts };
    if (typeof womenProducts !== 'undefined') allProducts = { ...allProducts, ...womenProducts };

    const category = productGrid.dataset.category;
    const fullProductList = allProducts[category] || [];

    if (fullProductList.length > 0) {
      // --- CALCULATE WHICH PRODUCTS TO SHOW ON THE CURRENT PAGE ---
      const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
      const endIndex = startIndex + PRODUCTS_PER_PAGE;
      const paginatedProducts = fullProductList.slice(startIndex, endIndex);
      
      productGrid.innerHTML = ''; // Clear existing content

      // --- RENDER ONLY THE PRODUCTS FOR THE CURRENT PAGE ---
      paginatedProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        card.setAttribute('data-name', product.name);
        card.setAttribute('data-price', product.price);
        card.setAttribute('data-img-src', product.imgSrc);
        card.setAttribute('data-alt', product.alt || product.name);
        card.setAttribute('data-description', product.description || 'No description available.');
        
        card.innerHTML = `
          <div class="product-card__image-container">
            <img src="${product.imgSrc}" alt="${product.alt || product.name}">
          </div>
          <div class="product-card__info">
            <h3 class="product-card__name">${product.name}</h3>
            <div class="product-card__price">   
              <span class="price--sale">${product.price}</span>
            </div>
          </div>
        `;
        
        productGrid.appendChild(card);
        
        card.classList.add('fade-in-up');
        observer.observe(card);
      });

      // --- RENDER THE PAGINATION CONTROLS ---
      const totalPages = Math.ceil(fullProductList.length / PRODUCTS_PER_PAGE);
      renderPagination(totalPages, currentPage);

    } else {
      productGrid.innerHTML = '<p>No products found in this category.</p>';
      console.warn(`Product category "${category}" not found or is empty.`);
    }
  }

  // --- NEW FUNCTION TO CREATE AND DISPLAY PAGINATION LINKS ---
  function renderPagination(totalPages, currentPage) {
    const paginationContainer = document.getElementById('pagination-container');
    if (!paginationContainer || totalPages <= 1) return; // Don't show pagination if only 1 page

    let paginationHTML = '';
    const pageUrl = window.location.pathname; // Gets the current file name (e.g., /bed-sheets.html)

    // "Previous" button
    if (currentPage > 1) {
      paginationHTML += `<a href="${pageUrl}?page=${currentPage - 1}" class="pagination-link">&laquo; Prev</a>`;
    }

    // Page number links
    for (let i = 1; i <= totalPages; i++) {
      if (i === currentPage) {
        paginationHTML += `<span class="pagination-link active">${i}</span>`;
      } else {
        paginationHTML += `<a href="${pageUrl}?page=${i}" class="pagination-link">${i}</a>`;
      }
    }

    // "Next" button
    if (currentPage < totalPages) {
      paginationHTML += `<a href="${pageUrl}?page=${currentPage + 1}" class="pagination-link">Next &raquo;</a>`;
    }

    paginationContainer.innerHTML = paginationHTML;
  }
});