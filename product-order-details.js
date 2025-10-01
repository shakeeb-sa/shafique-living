/* ========================================================= */
/* === PRODUCT MODAL SCRIPT (FIXED FOR ALL DYNAMIC PAGES) === */
/* ========================================================= */
document.addEventListener('DOMContentLoaded', () => {

  // --- CONFIGURATION ---
  const wholesalerWhatsAppNumber = '923248229890'; 
  
  // --- ELEMENT SELECTION ---
  const productGridContainer = document.getElementById('product-grid-container');
  const modal = document.getElementById('product-modal');
  const modalImg = document.getElementById('modal-img');
  const modalName = document.getElementById('modal-name');
  const modalPrice = document.getElementById('modal-price');
  const modalDescription = document.getElementById('modal-description');
  const whatsappBtn = document.getElementById('whatsapp-order-btn');
  const closeModalBtn = document.querySelector('.modal-close');

  // --- FUNCTIONS ---
  const openModal = (card) => {
    const name = card.dataset.name;
    const price = card.dataset.price;
    const imgSrc = card.dataset.imgSrc;
    const description = card.dataset.description;

    modalImg.src = imgSrc;
    modalImg.alt = name;
    modalName.textContent = name;
    modalPrice.textContent = price;
    modalDescription.textContent = description;
    
    // ▼▼▼ THIS IS THE CORRECTED MESSAGE STRING ▼▼▼
    // It now includes the product name, price, description, and image link.
    const message = `Hello, I would like to order this product:\n\n*Product:* ${name}\n*Price:* ${price}\n*Description:* ${description}\n*Image:* ${imgSrc}\n\nPlease let me know the next steps. Thank you!`;
    
    const whatsappUrl = `https://wa.me/${wholesalerWhatsAppNumber}?text=${encodeURIComponent(message)}`;
    
    whatsappBtn.href = whatsappUrl;

    modal.classList.add('active');
    document.body.classList.add('modal-open');
  };

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
  };

  // --- EVENT LISTENERS ---
  if (productGridContainer) {
    productGridContainer.addEventListener('click', (event) => {
      const card = event.target.closest('.product-card');
      if (card) {
        openModal(card);
      }
    });
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });
  }
  
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

});