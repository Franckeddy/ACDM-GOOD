import { TweenLite, TweenMax, TimelineLite } from "gsap";
import { SCROLLMAGIC_CONTROLLER } from '../constants/constants';
import ScrollMagic from 'scrollmagic';
import { initSwipers } from "../utils/functions.js";
import { scrollToElement } from "../utils/functions";

export default class SingleWatch {
  constructor() {
    this.sections = document.querySelectorAll('.single__watches.desktop');
    this.aside = document.querySelector('.single__watches__text-part-wrapper');


    initSwipers(this.sections, {
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
      direction: 'vertical',
      loop: true,
      autoplay: false,
      autoHeight: true,
      effect: 'fade',
    });


    this.animate();
    this.scrollToImage();
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

      // new ScrollMagic.Scene({
      //   triggerElement: section,
      //   triggerHook: 0.95,
      //   offset: 150,
      //   reverse: true,
      // })
      //   .setTween(timeline)
      //   .addTo(SCROLLMAGIC_CONTROLLER);
    });
  }

  scrollToImage() {
    this.sections.forEach(section => {
      const bullets = section.querySelectorAll('.pagination-bullet');

      const images = section.querySelectorAll('img');
      images.forEach((image, index) => {
        new ScrollMagic.Scene({
          triggerElement: image,
          duration: image.clientHeight
        })
          .addIndicators(true)
          .on('progress', function (e) {
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
  };


}