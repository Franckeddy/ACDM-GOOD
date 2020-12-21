import { TweenLite, TweenMax, TimelineLite } from "gsap";
import { SCROLLMAGIC_CONTROLLER } from '../constants/constants';
import ScrollMagic from 'scrollmagic';
import { scrollToElement } from "../utils/functions";

export default class Presentation {
  constructor() {
    this.sections = document.querySelectorAll('.presentation');

    this.sections.forEach(section => {
      const button = section.querySelector('.presentation__arrow');
      button.addEventListener('click', scrollToElement);
    })

    this.animate();

  }

  animate() {
    this.sections.forEach(section => {

      const logo = section.querySelectorAll('.presentation__logo');
      const logoAnimation = TweenMax.staggerFromTo(logo, .8, { autoAlpha: 0 }, { autoAlpha: 1 }, .2);
      const textLeft = section.querySelectorAll('.logo-text--left');
      const textLeftAnimation = TweenMax.staggerFromTo(textLeft, .75, { x: -100, autoAlpha: 0 }, { x: 0, autoAlpha: 1 }, .2);
      const textRight = section.querySelectorAll('.logo-text--right');
      const textRightAnimation = TweenMax.staggerFromTo(textRight, .75, { x: 100, autoAlpha: 0 }, { x: 0, autoAlpha: 1 }, .2);


      const timeline = new TimelineLite();
      timeline
        .add(logoAnimation)
        .add(textLeftAnimation)
        .add(textRightAnimation);

      new ScrollMagic.Scene({
        triggerElement: section,
        triggerHook: 0.95,
        offset: 0,
        reverse: true,
      })
        .setTween(timeline)
        .addTo(SCROLLMAGIC_CONTROLLER);
    });
  }





}