/**
 * Single Watch - New Layout - Interactions
 */

document.addEventListener('DOMContentLoaded', function() {
  
  // ========================================
  // GESTION DES VIGNETTES D'IMAGES
  // ========================================
  
  const thumbnails = document.querySelectorAll('.thumbnail-item');
  const mainImage = document.querySelector('#main-watch-image img');
  const mainLink = document.querySelector('#main-watch-image');

  if (thumbnails.length > 0 && mainImage) {
    thumbnails.forEach(function(thumbnail) {
      thumbnail.addEventListener('click', function() {
        // Retirer la classe active de tous les thumbnails
        thumbnails.forEach(t => t.classList.remove('active'));
        
        // Ajouter la classe active au thumbnail cliqué
        this.classList.add('active');
        
        // Changer l'image principale avec animation
        mainImage.style.opacity = '0.5';
        
        setTimeout(() => {
          const newImageSrc = this.querySelector('img').getAttribute('data-full-image');
          const newImageAlt = this.querySelector('img').getAttribute('alt');
          
          mainImage.src = newImageSrc;
          mainImage.srcset = newImageSrc;
          mainImage.alt = newImageAlt;
          mainLink.href = newImageSrc;
          
          mainImage.style.opacity = '1';
        }, 150);
      });

      // Ajouter un effet de survol
      thumbnail.addEventListener('mouseenter', function() {
        if (!this.classList.contains('active')) {
          this.style.opacity = '0.7';
        }
      });

      thumbnail.addEventListener('mouseleave', function() {
        this.style.opacity = '1';
      });
    });
  }

  // ========================================
  // GESTION DE LA QUANTITÉ
  // ========================================
  
  const minusButtons = document.querySelectorAll('.quantity-minus');
  const plusButtons = document.querySelectorAll('.quantity-plus');
  
  minusButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const input = this.nextElementSibling;
      const currentValue = parseInt(input.value);
      const minValue = parseInt(input.getAttribute('min')) || 1;
      
      if (currentValue > minValue) {
        input.value = currentValue - 1;
        updateQuantityDisplay(input);
      }
    });
  });

  plusButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const input = this.previousElementSibling;
      const currentValue = parseInt(input.value);
      const maxValue = parseInt(input.getAttribute('max')) || 99;
      
      if (currentValue < maxValue) {
        input.value = currentValue + 1;
        updateQuantityDisplay(input);
      }
    });
  });

  // Validation de l'input manuel
  const quantityInputs = document.querySelectorAll('.quantity-input');
  quantityInputs.forEach(input => {
    input.addEventListener('change', function() {
      const minValue = parseInt(this.getAttribute('min')) || 1;
      const maxValue = parseInt(this.getAttribute('max')) || 99;
      let value = parseInt(this.value);

      if (isNaN(value) || value < minValue) {
        value = minValue;
      } else if (value > maxValue) {
        value = maxValue;
      }

      this.value = value;
      updateQuantityDisplay(this);
    });

    // Empêcher la saisie de caractères non numériques
    input.addEventListener('keypress', function(e) {
      if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
        e.preventDefault();
      }
    });
  });

  function updateQuantityDisplay(input) {
    // Animation légère lors du changement
    input.style.transform = 'scale(1.1)';
    setTimeout(() => {
      input.style.transform = 'scale(1)';
    }, 150);
  }

  // ========================================
  // GESTION DU BOUTON AJOUTER AU PANIER
  // ========================================
  
  const addToCartButtons = document.querySelectorAll('.cta__add-to-cart');
  
  addToCartButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Récupérer la quantité
      const quantityInput = this.closest('.single__watches__actions').querySelector('.quantity-input');
      const quantity = parseInt(quantityInput.value);
      
      // Animation du bouton
      this.classList.add('adding');
      this.textContent = 'AJOUT EN COURS...';
      
      // Simulation d'ajout au panier (à remplacer par votre logique réelle)
      setTimeout(() => {
        this.textContent = '✓ AJOUTÉ AU PANIER';
        this.style.backgroundColor = '#4CAF50';
        
        setTimeout(() => {
          this.textContent = 'AJOUTER AU PANIER';
          this.style.backgroundColor = '';
          this.classList.remove('adding');
        }, 2000);
        
        // Appeler votre fonction d'ajout au panier ici
        addToCart(quantity);
      }, 800);
    });
  });

  function addToCart(quantity) {
    // TODO: Implémenter la logique d'ajout au panier
    // Exemple : appel AJAX vers votre backend
    console.log(`Ajout de ${quantity} article(s) au panier`);
    
    /*
    fetch('/api/cart/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product_id: getCurrentProductId(),
        quantity: quantity
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      // Mettre à jour l'interface (compteur panier, etc.)
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    */
  }

  // ========================================
  // CAROUSEL MOBILE (SWIPE)
  // ========================================
  
  const mobileCarousels = document.querySelectorAll('.mobile-carousel__track');
  
  mobileCarousels.forEach(carousel => {
    let isDown = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener('mousedown', (e) => {
      isDown = true;
      carousel.style.cursor = 'grabbing';
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => {
      isDown = false;
      carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mouseup', () => {
      isDown = false;
      carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 2;
      carousel.scrollLeft = scrollLeft - walk;
    });

    // Support tactile
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });

    function handleSwipe() {
      const swipeThreshold = 50;
      if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left
        scrollCarousel(carousel, 'next');
      }
      if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right
        scrollCarousel(carousel, 'prev');
      }
    }

    function scrollCarousel(element, direction) {
      const scrollAmount = element.offsetWidth;
      if (direction === 'next') {
        element.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      } else {
        element.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
    }
  });

  // ========================================
  // PARTAGE SOCIAL
  // ========================================
  
  const shareButtons = document.querySelectorAll('.share-icon');
  
  shareButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      
      const url = window.location.href;
      const title = document.querySelector('.single__watches__title').textContent;
      
      // Déterminer le type de partage
      const platform = this.getAttribute('aria-label').toLowerCase();
      
      let shareUrl = '';
      
      switch(platform) {
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
          break;
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
          break;
        case 'pinterest':
          const imageUrl = document.querySelector('#main-watch-image img').src;
          shareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(imageUrl)}&description=${encodeURIComponent(title)}`;
          break;
      }
      
      if (shareUrl) {
        window.open(shareUrl, 'share-dialog', 'width=626,height=436');
      }
    });
  });

  // ========================================
  // LAZY LOADING POUR LES IMAGES
  // ========================================
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  // ========================================
  // SMOOTH SCROLL POUR LES ANCRES
  // ========================================
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

});

// ========================================
// FONCTIONS UTILITAIRES
// ========================================

// Fonction pour obtenir l'ID du produit actuel
function getCurrentProductId() {
  // TODO: Adapter selon votre structure
  const postElement = document.querySelector('[id^="post-"]');
  if (postElement) {
    return postElement.id.replace('post-', '');
  }
  return null;
}

// Debounce function pour optimiser les événements
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
