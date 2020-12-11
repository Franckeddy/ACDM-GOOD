import { TweenLite, TweenMax } from "gsap";
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
                spaceBetween: 0,
                centeredSlides: true,
                setWrapperSize:true,
            },
            570 :{
                slidesPerView: 3,
                spaceBetween: 0,
                centeredSlides: true,
                setWrapperSize:true,
            },
            730: {
                slidesPerView: 5,
                spaceBetween: 10,
                centeredSlides: false,
                setWrapperSize:true,
            },
            1000 :{
                slidesPerView: 6,
                spaceBetween: 4,
                centeredSlides: false,
                setWrapperSize:true,
            }
        }
        // watchOverflow: true,
      });
  
      this.animate();
    }
  
    animate() {
      this.sections.forEach(section => {
        
        const ornament = section.querySelectorAll('.ornament');
        const ornamentAnimation = TweenMax.staggerFromTo(ornament, 1.3, {autoAlpha: 0}, {autoAlpha: 1}, 1.6);
    
        new ScrollMagic.Scene({
          triggerElement: section,
          triggerHook: 0.95,
          offset: 200,
          reverse: true,
        })
        //   .setTween([ornamentAnimation])
          .addTo(SCROLLMAGIC_CONTROLLER);
      });
    }
  }