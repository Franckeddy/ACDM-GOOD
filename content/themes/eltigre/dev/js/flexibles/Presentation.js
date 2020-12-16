import { TweenLite, TweenMax } from "gsap";
import { SCROLLMAGIC_CONTROLLER } from '../constants/constants';
import ScrollMagic from 'scrollmagic';

export default class Presentation {
    constructor() {
      this.sections = document.querySelectorAll('.presentation');
      this.button = document.querySelectorAll('.presentation__arrow');
      this.animate();

    }
  
    animate() {
      this.sections.forEach(section => {
        
        const logo = section.querySelectorAll('.presentation__logo');
        const logoAnimation = TweenMax.staggerFromTo(logo, .8, {autoAlpha: 0}, {autoAlpha: 1}, .2);
        const textLeft = section.querySelectorAll('.logo-text--left');
        const textLeftAnimation = TweenMax.staggerFromTo(textLeft, .75, {x:-100 ,autoAlpha: 0}, {x:0 , autoAlpha: 1}, .2);
        const textRight = section.querySelectorAll('.logo-text--right');
        const textRightAnimation = TweenMax.staggerFromTo(textRight, .75, {x:100 ,autoAlpha: 0}, {x:0 , autoAlpha: 1}, .2);

        new ScrollMagic.Scene({
          triggerElement: section,
          triggerHook: 0.95,
          offset:0 ,
          reverse: true,
        })
          .setTween([logoAnimation, textLeftAnimation, textRightAnimation])
          .addTo(SCROLLMAGIC_CONTROLLER);
      });
    }

    

  

  }