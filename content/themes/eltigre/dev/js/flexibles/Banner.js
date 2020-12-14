import { TweenLite, TweenMax } from "gsap";
import { SCROLLMAGIC_CONTROLLER } from '../constants/constants';
import ScrollMagic from 'scrollmagic';
import { initSwipers } from "../utils/functions.js";

export default class Banner {
    constructor() {
      this.sections = document.querySelectorAll('.banner');
  
      this.animate();
    }
  
    animate() {
      this.sections.forEach(section => {
        
        const title = section.querySelectorAll('.banner__title');
        const titleAnimation = TweenMax.staggerFromTo(title, .6, {x: -300, autoAlpha:0}, {x:0, autoAlpha:1}, .2);
        const subtitle = section.querySelectorAll('.banner__subtitle');
        const subtitleAnimation = TweenMax.staggerFromTo(subtitle, .6, {x: 300, autoAlpha:0}, {x:0, autoAlpha:1}, .2);
        const text = section.querySelectorAll('.banner__description');
        const textAnimation = TweenMax.staggerFromTo(text, .6, {x: 300, autoAlpha:0}, {x:0, autoAlpha:1}, .2);

        new ScrollMagic.Scene({
          triggerElement: section,
          triggerHook: 0.95,
          offset:150 ,
          reverse: true,
        })
          .setTween([titleAnimation, subtitleAnimation, textAnimation])
          .addTo(SCROLLMAGIC_CONTROLLER);
      });
    }
  }