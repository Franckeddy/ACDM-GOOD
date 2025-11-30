const jQuery = require('jquery');

(function ($) {
  const lightbox = require('lightbox2');
  lightbox.option({
    'alwaysShowNavOnTouchDevices': true,
    'resizeDuration': 450,
    'wrapAround': true,
    'disableScrolling': true,
    'fitImagesInViewport': true,
    'albumLabel': "Photo %1 sur %2",
    'positionFromTop': 0
  });
})(jQuery);

import { TweenLite, TweenMax, TimelineLite } from "gsap";
import { SCROLLMAGIC_CONTROLLER } from '../constants/constants';
import ScrollMagic from 'scrollmagic';
import { initSwipers } from "../utils/functions.js";
import { scrollToElement } from "../utils/functions";
import { getNavigator } from "../utils/functions";

export default class SingleWatch {
  constructor() {
    this.body = document.querySelector('body');
    this.sections = document.querySelectorAll('.single__watches.desktop');
    this.aside = document.querySelector('.single__watches__text-part-wrapper');
    this.sectionsMobile = document.querySelectorAll('.single__watches.mobile');
    
    initSwipers(this.sectionsMobile, {
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
      direction: 'vertical',
      loop: true,
      autoplay: true,
      speed: 205,
      autoHeight: true,
      effect: 'fade',
    });
    
    this.animate();
    setTimeout(() => this.scrollToImage(), 250);
    this.initToggles(); // ⭐ LIGNE AJOUTÉE
  }

  animate() {
    this.sections.forEach(section => {

      const layoutRight = section.querySelector('.content--layout-right');

      const images = section.querySelectorAll('.single__watches-images img');
      const imagesFromVars = layoutRight ? { x: 300, autoAlpha: 0 } : { x: -300, autoAlpha: 0 };
      const imagesToVars = { x: 0, autoAlpha: 1 };
      const imagesAnimation = TweenMax.staggerFromTo(images, .6, imagesFromVars, imagesToVars, .2);

      const text = section.querySelectorAll('.single__watches__text-part');
      const textFromVars = layoutRight ? { x: -300, autoAlpha: 0 } : { x: 300, autoAlpha: 0 };
      const textToVars = { x: 0, autoAlpha: 1 };
      const textAnimation = TweenMax.staggerFromTo(text, .6, textFromVars, textToVars, .2);

      const timeline = new TimelineLite();
      timeline.add(imagesAnimation)
    });
  }

  scrollToImage() {

    this.sections.forEach(section => {
      const bullets = section.querySelectorAll('.pagination-bullet');
      const images = section.querySelectorAll('img');

      images.forEach((image, index) => {

        new ScrollMagic.Scene({
          triggerElement: image,
          duration: image.clientHeight,
        })
          .on('enter', function (e) {
            setActiveBullet(bullets[index]);
          })
          .addTo(SCROLLMAGIC_CONTROLLER);
      })

      bullets.forEach((bullet, index) => {
        bullet.addEventListener('click', function (event) {

          const headerOffset = index === 0 ? 144 : 90;
          const scrollFn = scrollToElement.bind(this);
          scrollFn(event, headerOffset);
        });
      })

      const setActiveBullet = function (bullet) {
        const bulletActive = section.querySelector('.pagination-bullet.active');
        if (bulletActive) bulletActive.classList.remove('active');
        bullet.classList.add('active');
      }
    })
  }

  // ⭐ MÉTHODE AJOUTÉE - Gestion des accordéons
  initToggles() {
    const toggleHeaders = document.querySelectorAll('.js-toggle');
    
    toggleHeaders.forEach(header => {
      header.addEventListener('click', function() {
        const toggle = this.closest('.toggle');
        const content = toggle.querySelector('.toggle__content');
        
        const isActive = content.classList.contains('active');
        
        if (isActive) {
          content.classList.remove('active');
          this.classList.remove('active');
          content.style.maxHeight = null;
        } else {
          content.classList.add('active');
          this.classList.add('active');
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    });
  }

}
