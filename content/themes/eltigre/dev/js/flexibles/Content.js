import { TweenLite, TweenMax, TimelineLite } from "gsap";
import { SCROLLMAGIC_CONTROLLER } from '../constants/constants';
import ScrollMagic from 'scrollmagic';
import { initSwipers } from "../utils/functions.js";
import objectFitImages from 'object-fit-images';

export default class Content {
  constructor() {
    this.sections = document.querySelectorAll('.content');
    initSwipers(this.sections, {
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
      loop: true,
      autoplay: {
        delay: 6000,
      },
      autoHeight: true,
      effect: 'fade',
    });
    objectFitImages( 'img' );
    this.animate();
  }

  animate() {
    this.sections.forEach(section => {

      const layoutRight = section.querySelector('.content--layout-right');

      const images = section.querySelectorAll('.content__images .images');
      const imagesFromVars = layoutRight ? { x: 300, autoAlpha: 0 } : { x: -300, autoAlpha: 0 };
      const imagesToVars = { x: 0, autoAlpha: 1 };
      const imagesAnimation = TweenMax.staggerFromTo(images, .6, imagesFromVars, imagesToVars, .2);

      const text = section.querySelectorAll('.content__text-part');
      const textFromVars = layoutRight ? { x: -300, autoAlpha: 0 } : { x: 300, autoAlpha: 0 };
      const textToVars = { x: 0, autoAlpha: 1 };
      const textAnimation = TweenMax.staggerFromTo(text, .6, textFromVars, textToVars, .2);


      const timeline = new TimelineLite();
      timeline.add(imagesAnimation).add(textAnimation);

      new ScrollMagic.Scene({
        triggerElement: section,
        triggerHook: 0.95,
        offset: 150,
        reverse: true,
      })
        .setTween(timeline)
        .addTo(SCROLLMAGIC_CONTROLLER);
    });
  }
}