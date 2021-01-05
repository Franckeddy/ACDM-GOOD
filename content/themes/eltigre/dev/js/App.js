require('jquery');
import Navigation from './class/navigation';
import ScrollMagic from 'scrollmagic';
import gsap, { TweenLite } from 'gsap';
import Swup from 'swup';
import initFlexibleSections from './flexibles/Init.js';
import { SCROLLMAGIC_CONTROLLER } from './constants/constants.js';
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
ScrollMagicPluginGsap(ScrollMagic, gsap);
import objectFitImages from 'object-fit-images';

if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}
export default class App {

    constructor(isFirstLoad = true) {
        this.scenes = [];

        this.revealManager();
        // this.debugManager();
        // Sections flexibles
        initFlexibleSections();
        //Navigation 
        this.menu = new Navigation();

        objectFitImages( 'img' );
    }

    revealManager() {
        let _this = this;

        document.querySelectorAll('[gsap-reveal]').forEach(el => {
            let tween = TweenLite.fromTo(el, 1, { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: Quad.easeOut });

            let scene = new ScrollMagic.Scene({ triggerElement: el, triggerHook: 0.95, duration: window.clientHeight / 3 })
                .setTween(tween)
                .addTo(SCROLLMAGIC_CONTROLLER);

            _this.scenes.push(scene);
        })
    }

    debugManager() {
        const debugGrid = document.querySelector('.susy-grid');
        const gridBck = window.getComputedStyle(debugGrid).backgroundImage;
        window.addEventListener('keypress', function (ev) {
            if (ev.keyCode == 100) {
                const mainWrapper = document.querySelector('.main-wrapper');
                const wrapperStyle = window.getComputedStyle(mainWrapper)
                if (wrapperStyle.backgroundImage == 'none') {
                    mainWrapper.style.backgroundImage = gridBck;
                } else {
                    mainWrapper.style.backgroundImage = 'none';
                }
            }
        });
    }

    static destroy() {
        this.scrollMagicController.destroy(true);
        this.scrollMagicController = null;
        this.scenes = [];
    }
};

document.addEventListener("DOMContentLoaded", function (ev) {
    new App();
    const swup = new Swup();
    swup.on('contentReplaced', () => {
        new App(false);
        // Lorsqu'on change de page, on reviens tout en haut. 
        window.scrollTo(0, 0);
    });

});

