import Barba from '@barba/core';
import TweenLite from 'gsap';
import App from '../App.js';


export default class ElTigreBarba {
    constructor() {
        Barba.init({
            sync: true,
            transitions: [{
                leave({ current, next, trigger }) {
                    try {
                        return new Promise(resolve => {
                            TweenLite.to(current.container, 0.75, 
                                {autoAlpha: 0, x: 150, onComplete: () => {
                                    current.container.style.display = 'none';
                                    resolve();
                                } }
                            );
                        })
                    } catch (e) {
                        console.log('Barba: ' + e);
                    }
                },

                enter({ current, next, trigger }) {
                    console.log(next);
                    try {
                        return new Promise(resolve => {
                            const anchorTarget = next.url.href.split('#').pop();
                            const scrollPosition = document.getElementById(anchorTarget) ? document.getElementById(anchorTarget).offsetTop - 150 : 0;
                            window.scrollTo(0, scrollPosition);
                            
                            new App();
    
                            TweenLite.from(next.container, 0.75, 
                                {autoAlpha: 0, x: -150, onComplete: () => {
                                    next.container.style.transform = 'none';
                                    resolve();

                                }}
                            );
                        });
                    } catch (e) {
                        console.log('Barba: ' + e);
                    }
                },
            }]
        });
    }
}