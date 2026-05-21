/**
 * p5.js Sketchbook Portal Application Logic
 * Implements interactive card hover effects, preview modal operations, and performance controls.
 */

document.addEventListener('DOMContentLoaded', () => {
  initCardHoverEffects();
  initPreviewModal();
});

/**
 * Creates a dynamic light reflection glow on glassmorphic cards
 * by updating local custom properties tracking the cursor position.
 */
function initCardHoverEffects() {
  const cards = document.querySelectorAll('.sketch-card:not(.placeholder)');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x coordinate within the card
      const y = e.clientY - rect.top;  // y coordinate within the card
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/**
 * Manages the iframe preview modal window.
 * Optimizes CPU/RAM by unloading the sketch frame entirely when closed.
 */
function initPreviewModal() {
  const modalOverlay = document.getElementById('previewModal');
  const modalContainer = modalOverlay.querySelector('.modal-container');
  const modalIframe = document.getElementById('modalIframe');
  const modalTitle = document.getElementById('modalTitle');
  const modalLoading = document.getElementById('modalLoading');
  const closeBtn = document.getElementById('closeModalBtn');
  const previewButtons = document.querySelectorAll('.btn-preview');

  // Open Modal Function
  const openModal = (sketchPath, sketchName) => {
    modalTitle.textContent = sketchName;
    modalLoading.style.opacity = '1';
    modalLoading.style.display = 'flex';
    
    // Set iframe source to the sketch's index.html
    modalIframe.src = sketchPath;
    
    // Open modal animation trigger
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Disable scroll under modal
  };

  // Close Modal Function
  const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Re-enable scroll
    
    // Crucial Performance Step: Reset iframe source to avoid background drawing/CPU load
    setTimeout(() => {
      modalIframe.src = 'about:blank';
    }, 400); // Wait for the transition to finish before unloading
  };

  // Attach event listeners to all quick preview buttons
  previewButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const sketchPath = button.getAttribute('data-path');
      const sketchName = button.getAttribute('data-name');
      openModal(sketchPath, sketchName);
    });
  });

  // Attach close events
  closeBtn.addEventListener('click', closeModal);
  
  // Close when clicking overlay (outside the modal container)
  modalOverlay.addEventListener('click', (e) => {
    if (!modalContainer.contains(e.target)) {
      closeModal();
    }
  });

  // Close when pressing the ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  // Handle iframe load completion
  modalIframe.addEventListener('load', () => {
    // Only fade out if we loaded an actual sketch (not about:blank)
    if (modalIframe.contentWindow.location.href !== 'about:blank') {
      modalLoading.style.opacity = '0';
      setTimeout(() => {
        modalLoading.style.display = 'none';
      }, 300);
      
      // Auto-focus the iframe so keyboard events (e.g. key presses in the sketch) work immediately
      modalIframe.focus();
    }
  });
}
