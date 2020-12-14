import { TweenLite, TweenMax } from "gsap";
import { SCROLLMAGIC_CONTROLLER } from '../constants/constants';
import ScrollMagic from 'scrollmagic';
import { initSwipers } from "../utils/functions.js";

export default class Content {
    constructor() {
      this.sections = document.querySelectorAll('.content');
  
      this.animate();
    }
  
    animate() {
      this.sections.forEach(section => {
        
        const imagesRight = section.querySelectorAll('.content--layout-right .images');
        const imagesRightAnimation = TweenMax.staggerFromTo(imagesRight, .6, {x: 300, autoAlpha:0}, {x:0, autoAlpha:1}, .2);
        const imagesLeft = section.querySelectorAll('.content--layout-left .images');
        const imagesleftAnimation = TweenMax.staggerFromTo(imagesLeft, .6, {x: -300, autoAlpha:0}, {x:0, autoAlpha:1}, .2);
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
          .setTween([imagesRightAnimation, imagesleftAnimation, subtitleAnimation, textAnimation])
          .addTo(SCROLLMAGIC_CONTROLLER);
      });
    }
  }