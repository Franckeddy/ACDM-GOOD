import { TweenLite, TweenMax } from "gsap";
import { SCROLLMAGIC_CONTROLLER } from '../constants/constants';
import ScrollMagic from 'scrollmagic';
import { initSwipers } from "../utils/functions.js";

export default class Watches {
    constructor() {
      this.sections = document.querySelectorAll('.watches');
      initSwipers(this.sections, {
        
        // spaceBetween: 30,
        loop: true,
        autoplay: true,
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 0,
                centeredSlides: true,
                setWrapperSize:true,
            },
            560 :{
                slidesPerView: 3,
                spaceBetween: 0,
                centeredSlides: false,
                setWrapperSize:true,
            },
            730: {
                slidesPerView: 4,
                spaceBetween: 0,
                centeredSlides: false,
                setWrapperSize:true,
            },
            1200 :{
                slidesPerView: 6,
                spaceBetween: 0,
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