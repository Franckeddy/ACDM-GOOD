import { TweenLite, TweenMax } from "gsap";
import { SCROLLMAGIC_CONTROLLER } from '../constants/constants';
import ScrollMagic from 'scrollmagic';
import { initSwipers } from "../utils/functions.js";
import { scrollToElement } from "../utils/functions";

export default class SingleWatch {
    constructor() {
      this.sections = document.querySelectorAll('.single__watches');
      this.distanceBeforeSticky = window.innerHeight/21;  
      this.aside = document.querySelector('.single__watches__text-part');

      window.addEventListener('scroll', this.stickyMenu.bind(this));

      initSwipers(this.sections, {
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true, 
        },
        direction :'vertical',
        loop: true,
        autoplay: false,
        autoHeight: true,
        effect : 'fade',
      });

      
      this.animate();
      this.scrollToImage();
    }
  
    animate() {
      this.sections.forEach(section => {
        
        const imagesRight = section.querySelectorAll('.content--layout-right .images');
        const imagesRightAnimation = TweenMax.staggerFromTo(imagesRight, .6, {x: 300, autoAlpha:0}, {x:0, autoAlpha:1}, .2);
        const imagesLeft = section.querySelectorAll('.content--layout-left .images');
        const imagesleftAnimation = TweenMax.staggerFromTo(imagesLeft, .6, {x: -300, autoAlpha:0}, {x:0, autoAlpha:1}, .2);
        const textLeft = section.querySelectorAll('.content--layout-left .content__text-part');
        const textLeftAnimation = TweenMax.staggerFromTo(textLeft, .6, {x: 300, autoAlpha:0}, {x:0, autoAlpha:1}, .2);
        const textRight = section.querySelectorAll('.content--layout-right .content__text-part');
        const textRightAnimation = TweenMax.staggerFromTo(textRight, .6, {x: -300, autoAlpha:0}, {x:0, autoAlpha:1}, .2);

        new ScrollMagic.Scene({
          triggerElement: section,
          triggerHook: 0.95,
          offset:150 ,
          reverse: true,
        })
          .setTween([imagesRightAnimation, imagesleftAnimation, textLeftAnimation, textRightAnimation ])
          .addTo(SCROLLMAGIC_CONTROLLER);
      });
    }

    scrollToImage() {
      this.sections.forEach(section => {
        console.log(section)
        const bullets = section.querySelectorAll('.pagination-bullet');
        console.log(bullets)
        bullets.forEach(bullet => {
          console.log(bullet)
          bullet.addEventListener('click', scrollToElement);
        })
      })
    }

    stickyMenu() {
      let aside = this.aside;
      if (window.scrollY > this.distanceBeforeSticky && !this.isSticky()) {
        aside.classList.add('sticky');
          // addTransition(header, 'slide-in', 300, 'sticky');
      }
      else if (window.scrollY < this.distanceBeforeSticky && this.isSticky()) {
        aside.classList.remove('sticky');
          // addTransition(header, 'slide-in', 300, '', 'sticky');
      }
    };
    
    isSticky() {

      return this.aside.classList.contains('sticky');
    };

  }