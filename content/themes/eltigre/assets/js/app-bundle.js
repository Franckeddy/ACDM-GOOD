(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    var val = aliases[name];
    return (val && name !== val) ? expandAlias(val) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};

			require.define({'dev/js/Device.js': function(exports, require, module) {
				export default class Device {
    static isMobile() {
        return window.innerWidth < 768;
    }

    static isTouchDevice() {
        return (window.DocumentTouch && document instanceof DocumentTouch);
    }     
};

			}});


		  
			require.define({'dev/js/class/Form.js': function(exports, require, module) {
				import { checkMail, checkPhoneNumber } from "../utils/functions";
import { TimelineLite } from 'gsap';

export default class Form {
  constructor(form) {
    this.el = form;
    this.contactFields = form.querySelector('.contact-form__fields');
    this.fields = form.querySelectorAll('input, textarea');
    this.submitButton = form.querySelector('.submit-button');
    this.tlForm = new TimelineLite();

    this.init();
  }


  init() {
    this.addFocusListeners();
  }


  addFocusListeners() {
    this.fields.forEach((field) => {
      // Removes error class on focus
      field.addEventListener('focus', function (e) {
        this.classList.remove('error');
      });

      // Checks if the field is empty on blur
      field.addEventListener('blur', function (e) {
        if (this.value != '')
          this.classList.add('not-empty');
        else
          this.classList.remove('not-empty');
      })
    });
  }

  validate() {
    let emptyFields = 0;
    let errors = [];


    this.fields.forEach((field) => {
      if (field.classList.contains('required') && field.value === '') {
        emptyFields++;
        field.classList.add('error');
      }
      if (
        field.name === 'lastname' && field.value === "") {
        errors.push('Veuillez entrer votre nom');
        field.classList.add('error');
      }
      if (
        field.name === 'subject' && field.value === "") {
        errors.push('Veuillez saisir un sujet');
        field.classList.add('error');
      }
      if (
        field.name === 'message' && field.value === "") {
        errors.push('Veuillez saisir votre message');
        field.classList.add('error');
      }
      if (field.type === 'email' && !checkMail(field.value)) {
        errors.push('Veuillez entrer une adresse E-Mail valide');
        field.classList.add('error');
      }

    });

    // if (emptyFields > 0) {                      
    //   errors.push(`${emptyFields} ${emptyFields > 1 ? 'champs' : 'champ'} requis vide`)
    // }

    this.displayErrors(errors);

    return errors.length == 0;
  }


  displayErrors(errors) {
    let errorsContainer = this.el.querySelector('.form__errors') || this.createErrorsContainer();

    errorsContainer.innerHTML = '';

    for (let i = 0; i < errors.length; i++) {
      let error = document.createElement('p');
      error.innerHTML = errors[i];
      errorsContainer.appendChild(error);
    }

    this.tlForm.fromTo(errorsContainer, 1, { left: -100, opacity: 0 }, { left: 0, opacity: 1 })
  }


  createErrorsContainer() {
    let errorsContainer = document.createElement('div');
    errorsContainer.classList.add('form__errors');

    this.contactFields.appendChild(errorsContainer);

    return errorsContainer;
  }
}


			}});


		  ;
			require.define({'dev/js/class/Loader.js': function(exports, require, module) {
				export default class Loader {

    constructor(el) {
        this.el = el;
    
        // Store default element values
        this.textWrapper    = this.el;
        this.text           = this.textWrapper.innerText;
        this.fontSize       = this.el.style.fontSize;
        this.color          = this.el.style.color;
        this.width          = this.el.clientWidth;
        this.height         = this.el.clientHeight;
        this.background     = this.el.style.backgroundColor || this.el.style.background;
    
        this.el.style.minWidth = this.width + 'px';
        this.el.style.minHeight = this.height + 'px';
    }


    load() {
        this.textWrapper.innerText = '';
        this.el.style.width  = this.width + 'px';
        this.el.style.height = this.height + 'px';

        var loader = document.createElement('div');
        loader.classList.add('loader');
        loader.innerHTML = '<div></div><div></div><div></div>';
        this.el.appendChild(loader);

        this.el.classList.add('disabled');
    }


    success(message) {
        this.textWrapper.innerText = message;
        this.removeLoader();
    }


    error(message = '', delay = 0) {
        this.textWrapper.innerText = message;

        setTimeout(() => {
            this.el.classList.remove('disabled');
            this.removeLoader();
            this.resetLabel();

        }, delay);
    }


    remove() {
        this.el.parentElement.removeChild(this.el);
    }


    removeLoader() {
        this.el.classList.remove('loading');
        var loader = this.el.querySelector('.loader');

        this.resetSize();

        if (loader)
            loader.parentElement.removeChild(loader);
    }

    reset() {
        this.resetLabel();
        this.resetSize();
        this.el.classList.remove('disabled');
    }


    resetLabel() {
        this.textWrapper.innerText = this.text;
    }
    

    resetSize() {
        this.el.style.width = null;
        this.el.style.height = null;
    }
}

			}});


		  ;
			require.define({'dev/js/class/navigation.js': function(exports, require, module) {
				import { addTransition } from '../utils/functions';

export default class Navigation {
    constructor() {
        this.distanceBeforeSticky = window.innerHeight / 4 ;
        this.body = document.querySelector('body');
        this.header = document.getElementById('site-header');
        this.toggleBtn = document.querySelector('.burger-menu__wrapper');

        this.toggleBtn.addEventListener('click', this.toggleMenu.bind(this));
       
        window.addEventListener('scroll', this.stickyMenu.bind(this));

        // REMOVE NO SCROLL ON PAGE CHANGE
        document.querySelector('body').classList.remove('no-scroll');
        this.header.classList.remove('active');

        this.body.addEventListener('click', en => {
            this.header.classList.remove('active');
            this.body.classList.remove('no-scroll');
            this.toggleBtn.classList.remove('cross');
        });

        const menuItems = document.querySelectorAll('.menu-item, .site-logo, .footer_phone-number, .footer-contact');
        menuItems.forEach(item => {
            item.addEventListener('click', ev => {
                const activeItems = document.querySelectorAll('.current_page_item');
                activeItems.forEach(activeItem => activeItem.classList.remove('current_page_item'));

                const link = item.querySelector('a');
                const newActivesLinks = document.querySelectorAll(`a[href="${link.href}"]`);
                link.parentElement.classList.add('current_page_item');
                newActivesLinks.forEach(item => item.parentElement.classList.add('current_page_item'));

            })
    
        });
        const hashtagLinks = document.querySelectorAll('a[href*="#"]');
        hashtagLinks.forEach(link => link.parentElement.classList.remove('current_page_item'));
            
    }

    stickyMenu() {
        let header = this.header;
        if (window.pageYOffset > this.distanceBeforeSticky && !this.isSticky()) {
            header.classList.add('sticky');
            // addTransition(header, 'slide-in', 300, 'sticky');
        }
        else if (window.pageYOffset < this.distanceBeforeSticky && this.isSticky()) {
            header.classList.remove('sticky');
            // addTransition(header, 'slide-in', 300, '', 'sticky');
        }
    };

    isSticky() {

        return this.header.classList.contains('sticky');
    };

    toggleMenu(e) {
        e.stopPropagation();
        this.body.classList.toggle('no-scroll');
        this.header.classList.toggle('active');
        this.toggleBtn.classList.toggle('cross');
    }


}

			}});


		  ;
			require.define({'dev/js/constants/sections.js': function(exports, require, module) {
				import Banner from '../flexibles/Banner.js';
import Presentation from '../flexibles/Presentation.js';
import Watches from '../flexibles/Watches.js';
import Content from '../flexibles/Content.js';
import ContactForm from '../flexibles/ContactForm.js';
import SingleWatch from '../flexibles/SingleWatch.js';

export default {
    'presentation' : Presentation, 
    'banner' : Banner,  
    'watches' : Watches,
    'content' : Content,
    'single__watches' : SingleWatch,
    'contact': ContactForm,

};


			}});


		  
			require.define({'dev/js/flexibles/Banner.js': function(exports, require, module) {
				import { TweenLite, TweenMax, TimelineLite } from "gsap";
import { SCROLLMAGIC_CONTROLLER } from '../constants/constants';
import ScrollMagic from 'scrollmagic';
import { initSwipers } from "../utils/functions.js";

export default class Banner {
  constructor() {
    this.sections = document.querySelectorAll('.banner');
    
    // this.animate();
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

			}});


		  ;
			require.define({'dev/js/flexibles/ContactForm.js': function(exports, require, module) {
				import { TimelineLite, TweenMax } from "gsap";
import { SCROLLMAGIC_CONTROLLER } from "../constants/constants";
import ScrollMagic from 'scrollmagic';
import Form from '../class/Form.js';
import Loader from '../class/Loader.js';
import { post } from "../utils/functions";

export default class ContactForm {
    constructor() {
        this.sections = document.querySelectorAll('.contact');

        this.sections.forEach(section => {
            const form = new Form(section.querySelector('form'));
            const submit = new Loader(form.el.querySelector('.contact-form__cta-submit'));

            form.el.addEventListener('submit', this.submitForm(form, submit));
        });

        this.animate();
    }

    animate() {
        this.sections.forEach(section => {
            const image = section.querySelectorAll('.contact__image-block');
            const form = section.querySelectorAll('.contact-form');

            const imageAnimation = TweenMax.staggerFromTo(image, .5, { x: -300, autoAlpha: 0 }, { x: 0, autoAlpha: 1 }, .15)
            const formAnimation = TweenMax.staggerFromTo(form, .5, { x: 300, autoAlpha: 0 }, { x: 0, autoAlpha: 1 }, .15)


            const timeline = new TimelineLite();
            timeline.add(imageAnimation).add(formAnimation);

            new ScrollMagic.Scene({
                triggerElement: section,
                triggerHook: 0.95,
                offset: 100,
                reverse: true,
            })
                .setTween(timeline)
                .addTo(SCROLLMAGIC_CONTROLLER);
        });
    }

    submitForm = (form, loader) => {
        return (e) => {
            e.preventDefault();

            if (form.validate()) {
                loader.load();

                const args = {
                    action: 'submit_form',
                    form: form.el,
                }

                post(args, this.submitResponses(form, loader), true);
            }
        }
    }

    submitResponses = (form, loader) => {
        return (response) => {
            var result = JSON.parse(Array.of(response));

            if (result.success) {
                loader.success(result.data);
            } else {
                form.displayErrors([result.data]);
                loader.reset();
            }
        }
    }
}

			}});


		  ;
			require.define({'dev/js/flexibles/Content.js': function(exports, require, module) {
				import { TweenLite, TweenMax, TimelineLite } from "gsap";
import { SCROLLMAGIC_CONTROLLER } from '../constants/constants';
import ScrollMagic from 'scrollmagic';
import { initSwipers } from "../utils/functions.js";
import objectFitImages from 'object-fit-images';

export default class Content {
  constructor() {
    this.sections = document.querySelectorAll('.content');
    initSwipers(this.sections, {
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
      loop: true,
      autoplay: {
        delay: 6000,
      },
      autoHeight: true,
      effect: 'fade',
    });
    objectFitImages( 'img' );
    this.animate();
  }

  animate() {
    this.sections.forEach(section => {

      const layoutRight = section.querySelector('.content--layout-right');

      const images = section.querySelectorAll('.content__images .images');
      const imagesFromVars = layoutRight ? { x: 300, autoAlpha: 0 } : { x: -300, autoAlpha: 0 };
      const imagesToVars = { x: 0, autoAlpha: 1 };
      const imagesAnimation = TweenMax.staggerFromTo(images, .6, imagesFromVars, imagesToVars, .2);

      const text = section.querySelectorAll('.content__text-part');
      const textFromVars = layoutRight ? { x: -300, autoAlpha: 0 } : { x: 300, autoAlpha: 0 };
      const textToVars = { x: 0, autoAlpha: 1 };
      const textAnimation = TweenMax.staggerFromTo(text, .6, textFromVars, textToVars, .2);


      const timeline = new TimelineLite();
      timeline.add(imagesAnimation).add(textAnimation);

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

			}});


		  ;
			require.define({'dev/js/flexibles/Init.js': function(exports, require, module) {
				import SECTIONS from '../constants/sections.js';

export default function initFlexibleSections() {
    let activeSections = [];
    
    for (var section in SECTIONS)
        if (document.querySelector(`.${section}`))
            try {
                activeSections.push(new SECTIONS[section]());
            } catch (e) {
                console.error(section, e);
            }

    return activeSections;
}


			}});


		  ;
			require.define({'dev/js/flexibles/Presentation.js': function(exports, require, module) {
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

			}});


		  ;
			require.define({'dev/js/flexibles/Watches.js': function(exports, require, module) {
				import { TweenLite, TweenMax, TimelineLite } from "gsap";
import { SCROLLMAGIC_CONTROLLER } from '../constants/constants';
import ScrollMagic from 'scrollmagic';
import { initSwipers } from "../utils/functions.js";
import objectFitImages from 'object-fit-images';

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

			}});


		  ;
			require.define({'dev/js/utils/functions.js': function(exports, require, module) {
				// ✅ AJOUTEZ CES LIGNES EN HAUT DU FICHIER
import SwiperCore, { Navigation, Pagination, Autoplay, EffectFade } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

SwiperCore.use([Navigation, Pagination, Autoplay, EffectFade]);

export function initSwipers(swipersContainer, properties) {
    let className, hasNavigation, hasPagination, navigation, pagination, slidesCount;
    let swipers = [];
    for (let i = 0; i < swipersContainer.length; i++) {
        slidesCount = swipersContainer[i].querySelectorAll('.swiper-slide').length;
        if (slidesCount <= 1) continue;

        className = swipersContainer[i].className.split(' ')[0] + '--' + i;
        swipersContainer[i].classList.add(className);

        hasNavigation = swipersContainer[i].querySelector('.swiper-button-next');
        hasPagination = swipersContainer[i].querySelector('.swiper-pagination');

        if (hasNavigation) {
            navigation = {
                prevEl: swipersContainer[i].querySelector('.swiper-button-prev'),
                nextEl: swipersContainer[i].querySelector('.swiper-button-next')
            };
            properties.navigation = navigation;
        }

        if (hasPagination) {
            pagination = {
                el: hasPagination,
                clickable: true
            };
            properties.pagination = pagination;
        }

        // ✅ CHANGEZ Swiper en SwiperCore
        swipers.push(new SwiperCore('.' + className + ' .swiper-container', properties));
        swipersContainer[i].classList.add('swiper-initialized');
    }

    return swipers;
}

// Le reste de votre code reste identique...
export function scrollTopOnLinksCurrentUrl() {
    let currentUrl = window.location.href;

    if (currentUrl[currentUrl.length - 1] == '/') { }
    currentUrl = currentUrl.substring(0, currentUrl.length - 1);

    if (currentUrl.indexOf('#') != -1)
        currentUrl = currentUrl.substring(0, currentUrl.indexOf('#'));

    let currentPageLinks = document.querySelectorAll('a[href="' + currentUrl + '"]');


    addEvents(currentPageLinks, 'click', scrollToTop);
}

export function post(args, callback, isFormData = false) {
    let params;
    let request = new XMLHttpRequest();

    if (isFormData) {
        params = new FormData(args.form);

        for (let key in args)
            if (key != 'form')
                params.append(key, args[key]);
    } else {
        params = '';

        for (let key in args) {
            params += key + '=' + args[key] + '&';
        } params = params.substring(0, params.length - 1);
    }

    request.onload = function () {
        if (callback) {
            if (request.status >= 200 && request.status < 400) {
                callback(request.response);
            } else {
                callback({ success: false, data: { error: 'server' } });
            }
        }
    };

    request.onerror = function () {
        callback({ success: false, data: { error: 'connection' } });
    };
    request.open('POST', site.ajaxurl, true);
    if (!isFormData) request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send(params);
}

export function containsSection(className) {
    return document.querySelector('.' + className) !== null;
}

export function addTransition(target, className, duration, exitClass = '', classToRemove = '') {
    if (target.dataset.transition != 'true') {
        target.classList.add(className);
        target.dataset.transition = true;

        setTimeout(function () {
            target.classList.remove(className);
            target.dataset.transition = false;
            if (exitClass) target.classList.add(exitClass)
            if (classToRemove) target.classList.remove(classToRemove);

        }, duration)
    }
}

export function addEvents(targets, method, callback) {
    if (!NodeList.prototype.isPrototypeOf(targets) && !Array.isArray(targets)) {
        targets.addEventListener(method, callback);
    } else {
        for (let i = 0; i < targets.length; i++) {
            if (targets[i] === null) continue;

            if (!NodeList.prototype.isPrototypeOf(targets[i]) && !Array.isArray(targets[i])) {
                targets[i].addEventListener(method, callback);
            } else {
                for (let j = 0; j < targets[i].length; j++) {
                    targets[i][j].addEventListener(method, callback);
                }
            }
        }
    }
}

export function scrollToTop(e) {
    if (e) e.preventDefault();
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
}

export function scrollToElement(e, offset = 90) {
    try {
        e.preventDefault();
        const element = document.querySelector(this.dataset.scrollto);
        const elementPosition = element.getBoundingClientRect().top;
        const topOffset = window.pageYOffset + elementPosition - offset;
        window.scrollTo({
            top: topOffset,
            left: 0,
            behavior: 'smooth'
        });
    } catch (error) {
        console.error(error);
    }
}

export function getNavigator() {
    if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
        return 'opera';
    } else if (navigator.userAgent.indexOf("Chrome") != -1) {
        return 'chrome';
    } else if (navigator.userAgent.indexOf("Safari") != -1) {
        return 'safari';
    } else if (navigator.userAgent.indexOf("Firefox") != -1) {
        return 'firefox';
    } else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) {
        return 'IE';
    } else {
        return 'unknown';
    }
}

export function toggleScroll() {
    let body = document.querySelector('body');
    if (body) body.classList.toggle('no-scroll');
}

export function getParameterByName(name) {
    let url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export function pageEnabled(enabled = true) {
    let pageLockContainer = document.getElementById('page-lock');

    if (enabled) {
        pageLockContainer.classList.remove('locked');
    } else {
        pageLockContainer.classList.add('locked');
    }
}

export function checkMail(mail) {
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regex.test(mail);
}

export function checkPhoneNumber(number) {
    let regex = /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/;

    return regex.test(number);
}

export function checkDate(date) {
    let regex = /^([0][1-9]|[1][0-9]|[2][0-9]|[3][0-1])\/([0][1-9]|[1][0-2])\/([1][9][0-9][0-9]|[2][0][0-9]{2})$/;

    return regex.test(date);
}


			}});


		  ;require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');

require('dev/js/App.js');