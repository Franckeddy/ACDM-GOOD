/**
 * Active les boutons de navigation pour les carousels Content
 */

(function() {
  'use strict';
  
  console.log('🖼️ Content Navigation Buttons initializing...');

  setTimeout(function() {
    const contentSections = document.querySelectorAll('.content');
    
    if (!contentSections.length) {
      console.log('ℹ️ No content sections found');
      return;
    }

    console.log(`🖼️ Found ${contentSections.length} content section(s)`);

    contentSections.forEach((section, index) => {
      const prevBtn = section.querySelector('.content-nav-button.prev');
      const nextBtn = section.querySelector('.content-nav-button.next');
      const swiperContainer = section.querySelector('.swiper-container');
      
      if (!prevBtn || !nextBtn || !swiperContainer) return;

      // Récupérer l'instance Swiper
      let swiperInstance = swiperContainer.swiper;

      if (!swiperInstance) {
        setTimeout(() => {
          swiperInstance = swiperContainer.swiper;
          if (swiperInstance) {
            attachButtons();
          }
        }, 500);
      } else {
        attachButtons();
      }

      function attachButtons() {
        prevBtn.addEventListener('click', function(e) {
          e.preventDefault();
          if (swiperInstance && swiperInstance.slidePrev) {
            swiperInstance.slidePrev();
          }
        });

        nextBtn.addEventListener('click', function(e) {
          e.preventDefault();
          if (swiperInstance && swiperInstance.slideNext) {
            swiperInstance.slideNext();
          }
        });

        console.log(`  [${index}] ✅ Buttons activated`);
      }
    });

    console.log('✅ Content Navigation Buttons activated');
  }, 1000);

})();
