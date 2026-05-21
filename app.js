/**
 * p5.js Sketchbook Portal Application Logic
 * Matches the design and interaction patterns of zelva.design.
 * Manages performance-optimized canvas modals and keyboard triggers.
 */

document.addEventListener('DOMContentLoaded', () => {
  initPreviewModal();
});

/**
 * Manages the iframe preview modal window.
 * Optimizes CPU/RAM by unloading the sketch frame entirely when closed.
 */
function initPreviewModal() {
  const modalOverlay = document.getElementById('previewModal');
  const modalContent = modalOverlay.querySelector('.modal-content');
  const modalIframe = document.getElementById('modalIframe');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalLaunchLink = document.getElementById('modalLaunchLink');
  const modalLoading = document.getElementById('modalLoading');
  const closeBtn = document.getElementById('closeModalBtn');
  const codeCards = document.querySelectorAll('.code-card');

  // Open Modal Function
  const openModal = (sketchPath, sketchName, sketchDesc) => {
    modalTitle.textContent = sketchName;
    modalDesc.textContent = sketchDesc;
    modalLaunchLink.href = sketchPath;
    
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

  // Attach event listeners to all creative coding cards
  codeCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const sketchPath = card.getAttribute('data-path');
      const sketchName = card.getAttribute('data-name');
      const sketchDesc = card.getAttribute('data-desc');
      openModal(sketchPath, sketchName, sketchDesc);
    });
  });

  // Attach close events
  closeBtn.addEventListener('click', closeModal);

  // Close modal when launching full screen to free up CPU/RAM resources immediately
  modalLaunchLink.addEventListener('click', () => {
    closeModal();
  });
  
  // Close when clicking overlay (outside the modal content box)
  modalOverlay.addEventListener('click', (e) => {
    if (!modalContent.contains(e.target)) {
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
      
      // Auto-focus the iframe so keyboard events work immediately
      modalIframe.focus();
    }
  });
}
