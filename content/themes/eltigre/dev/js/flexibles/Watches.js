import { TweenLite, TweenMax, TimelineLite } from "gsap";
import { SCROLLMAGIC_CONTROLLER } from '../constants/constants';
import ScrollMagic from 'scrollmagic';
import { initSwipers } from "../utils/functions.js";

export default class Watches {
  constructor() {
    this.sections = document.querySelectorAll('.watches');
    initSwipers(this.sections, {
      loop: true,
      autoplay: false,
      breakpoints: {
        320: {
          slidesPerView: 2,
          spaceBetween: 15,
          centeredSlides: true,
          setWrapperSize: true,
        },
        730: {
          slidesPerView: 3,
          spaceBetween: 0,
          centeredSlides: true,
          setWrapperSize: true,
        },
        950: {
          slidesPerView: 4,
          spaceBetween: 10,
          centeredSlides: false,
          setWrapperSize: true,
        },
        1080: {
          slidesPerView: 5,
          spaceBetween: 10,
          centeredSlides: false,
          setWrapperSize: true,
        }
      }
    });

    this.animate();
  }

  animate() {
    this.sections.forEach(section => {
      const timeline = new TimelineLite();
      const title = section.querySelectorAll('.watches__title');
      if (title.length > 0) {
        const titleAnimation = TweenMax.staggerFromTo(title, .6, { x: -300, autoAlpha: 0 }, { x: 0, autoAlpha: 1 }, .2);
        timeline.add(titleAnimation);
      }

      const subtitle = section.querySelectorAll('.watches__subtitle');
      if (subtitle.length > 0) {
        const subtitleAnimation = TweenMax.staggerFromTo(subtitle, .6, { x: 300, autoAlpha: 0 }, { x: 0, autoAlpha: 1 }, .2);
        timeline.add(subtitleAnimation);
      }
      const watch = section.querySelectorAll('.watch');
      if (watch.length > 0) {
        const watchAnimation = TweenMax.staggerFromTo(watch, .8, { autoAlpha: 0 }, { autoAlpha: 1 }, .2);
        timeline.add(watchAnimation)
      }


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