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

  // Attach event listeners to all creative coding cards (Click for modal, Hover to auto-play)
  codeCards.forEach(card => {
    const sketchPath = card.getAttribute('data-path');
    const sketchName = card.getAttribute('data-name');
    const sketchDesc = card.getAttribute('data-desc');
    const previewContainer = card.querySelector('.code-canvas-preview');
    let hoverIframe = null;

    // Click handler to open full modal preview
    card.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(sketchPath, sketchName, sketchDesc);
    });

    // Hover play preview logic
    card.addEventListener('mouseenter', () => {
      if (!previewContainer || hoverIframe) return;

      // Create high-performance sandboxed iframe for inline preview
      hoverIframe = document.createElement('iframe');
      hoverIframe.className = 'card-iframe-preview';
      hoverIframe.src = sketchPath;
      
      // Once iframe is loaded, trigger smooth CSS fade-in transition
      hoverIframe.addEventListener('load', () => {
        if (hoverIframe && hoverIframe.src !== 'about:blank') {
          hoverIframe.classList.add('loaded');
          card.classList.add('preview-active');
        }
      });

      previewContainer.appendChild(hoverIframe);
    });

    card.addEventListener('mouseleave', () => {
      if (!hoverIframe) return;

      // Unload and destroy preview instantly to free CPU/RAM resources
      hoverIframe.src = 'about:blank';
      if (hoverIframe.parentNode) {
        hoverIframe.parentNode.removeChild(hoverIframe);
      }
      hoverIframe = null;
      
      card.classList.remove('preview-active');
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
