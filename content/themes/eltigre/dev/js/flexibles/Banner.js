import { TweenLite, TweenMax, TimelineLite } from "gsap";
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
      
      // if(!section.classList.contains('animated')) return;

      const timeline = new TimelineLite();

      const title = section.querySelectorAll('.banner__title.animated');
      if (title.length > 0) {
        const titleAnimation = TweenMax.staggerFromTo(title, .6, { x: -300, autoAlpha: 0 }, { x: 0, autoAlpha: 1 }, .2);
        timeline.add(titleAnimation)
      }

      const subtitle = section.querySelectorAll('.banner__subtitle.animated');
      if (subtitle.length > 0) {
        const subtitleAnimation = TweenMax.staggerFromTo(subtitle, .6, { x: 300, autoAlpha: 0 }, { x: 0, autoAlpha: 1 }, .2);
        timeline.add(subtitleAnimation);
      }

      const text = section.querySelectorAll('.banner__description.animated');
      if (text.length > 0) {
        const textAnimation = TweenMax.staggerFromTo(text, .6, { x: 300, autoAlpha: 0 }, { x: 0, autoAlpha: 1 }, .2);
        timeline.add(textAnimation);
      }

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