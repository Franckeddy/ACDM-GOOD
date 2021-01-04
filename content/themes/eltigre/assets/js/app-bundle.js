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

			require.define({'dev/js/App.js': function(exports, require, module) {
				"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _navigation = _interopRequireDefault(require("./class/navigation"));

var _scrollmagic = _interopRequireDefault(require("scrollmagic"));

var _gsap = _interopRequireWildcard(require("gsap"));

var _swup = _interopRequireDefault(require("swup"));

var _Init = _interopRequireDefault(require("./flexibles/Init.js"));

var _constants = require("./constants/constants.js");

var _scrollmagicPluginGsap = require("scrollmagic-plugin-gsap");

var _objectFitImages = _interopRequireDefault(require("object-fit-images"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

require('jquery');

(0, _scrollmagicPluginGsap.ScrollMagicPluginGsap)(_scrollmagic["default"], _gsap["default"]);

if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

var App = /*#__PURE__*/function () {
  function App() {
    var isFirstLoad = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    _classCallCheck(this, App);

    this.scenes = [];
    this.revealManager();
    this.debugManager(); // Sections flexibles

    (0, _Init["default"])(); //Navigation 

    this.menu = new _navigation["default"]();
    (0, _objectFitImages["default"])('img');
  }

  _createClass(App, [{
    key: "revealManager",
    value: function revealManager() {
      var _this = this;

      document.querySelectorAll('[gsap-reveal]').forEach(function (el) {
        var tween = _gsap.TweenLite.fromTo(el, 1, {
          y: 40,
          autoAlpha: 0
        }, {
          y: 0,
          autoAlpha: 1,
          ease: Quad.easeOut
        });

        var scene = new _scrollmagic["default"].Scene({
          triggerElement: el,
          triggerHook: 0.95,
          duration: window.clientHeight / 3
        }).setTween(tween).addTo(_constants.SCROLLMAGIC_CONTROLLER);

        _this.scenes.push(scene);
      });
    }
  }, {
    key: "debugManager",
    value: function debugManager() {
      var debugGrid = document.querySelector('.susy-grid');
      var gridBck = window.getComputedStyle(debugGrid).backgroundImage;
      window.addEventListener('keypress', function (ev) {
        if (ev.keyCode == 100) {
          var mainWrapper = document.querySelector('.main-wrapper');
          var wrapperStyle = window.getComputedStyle(mainWrapper);

          if (wrapperStyle.backgroundImage == 'none') {
            mainWrapper.style.backgroundImage = gridBck;
          } else {
            mainWrapper.style.backgroundImage = 'none';
          }
        }
      });
    }
  }], [{
    key: "destroy",
    value: function destroy() {
      this.scrollMagicController.destroy(true);
      this.scrollMagicController = null;
      this.scenes = [];
    }
  }]);

  return App;
}();

exports["default"] = App;
;
document.addEventListener("DOMContentLoaded", function (ev) {
  new App();
  var swup = new _swup["default"]();
  swup.on('contentReplaced', function () {
    new App(false); // Lorsqu'on change de page, on reviens tout en haut. 

    window.scrollTo(0, 0);
  });
});

			}});


		  
			require.define({'dev/js/Device.js': function(exports, require, module) {
				"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Device = /*#__PURE__*/function () {
  function Device() {
    _classCallCheck(this, Device);
  }

  _createClass(Device, null, [{
    key: "isMobile",
    value: function isMobile() {
      return window.innerWidth < 768;
    }
  }, {
    key: "isTouchDevice",
    value: function isTouchDevice() {
      return window.DocumentTouch && document instanceof DocumentTouch;
    }
  }]);

  return Device;
}();

exports["default"] = Device;
;

			}});


		  
			require.define({'dev/js/class/Form.js': function(exports, require, module) {
				"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _functions = require("../utils/functions");

var _gsap = require("gsap");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Form = /*#__PURE__*/function () {
  function Form(form) {
    _classCallCheck(this, Form);

    this.el = form;
    this.contactFields = form.querySelector('.contact-form__fields');
    this.fields = form.querySelectorAll('input, textarea');
    this.submitButton = form.querySelector('.submit-button');
    this.tlForm = new _gsap.TimelineLite();
    this.init();
  }

  _createClass(Form, [{
    key: "init",
    value: function init() {
      this.addFocusListeners();
    }
  }, {
    key: "addFocusListeners",
    value: function addFocusListeners() {
      this.fields.forEach(function (field) {
        // Removes error class on focus
        field.addEventListener('focus', function (e) {
          this.classList.remove('error');
        }); // Checks if the field is empty on blur

        field.addEventListener('blur', function (e) {
          if (this.value != '') this.classList.add('not-empty');else this.classList.remove('not-empty');
        });
      });
    }
  }, {
    key: "validate",
    value: function validate() {
      var emptyFields = 0;
      var errors = [];
      this.fields.forEach(function (field) {
        if (field.classList.contains('required') && field.value === '') {
          emptyFields++;
          field.classList.add('error');
        }

        if (field.name === 'lastname' && field.value === "") {
          errors.push('Veuillez entrer votre nom');
          field.classList.add('error');
        }

        if (field.name === 'subject' && field.value === "") {
          errors.push('Veuillez saisir un sujet');
          field.classList.add('error');
        }

        if (field.name === 'message' && field.value === "") {
          errors.push('Veuillez saisir votre message');
          field.classList.add('error');
        }

        if (field.type === 'email' && !(0, _functions.checkMail)(field.value)) {
          errors.push('Veuillez entrer une adresse E-Mail valide');
          field.classList.add('error');
        }
      }); // if (emptyFields > 0) {                      
      //   errors.push(`${emptyFields} ${emptyFields > 1 ? 'champs' : 'champ'} requis vide`)
      // }

      this.displayErrors(errors);
      return errors.length == 0;
    }
  }, {
    key: "displayErrors",
    value: function displayErrors(errors) {
      var errorsContainer = this.el.querySelector('.form__errors') || this.createErrorsContainer();
      errorsContainer.innerHTML = '';

      for (var i = 0; i < errors.length; i++) {
        var error = document.createElement('p');
        error.innerHTML = errors[i];
        errorsContainer.appendChild(error);
      }

      this.tlForm.fromTo(errorsContainer, 1, {
        left: -100,
        opacity: 0
      }, {
        left: 0,
        opacity: 1
      });
    }
  }, {
    key: "createErrorsContainer",
    value: function createErrorsContainer() {
      var errorsContainer = document.createElement('div');
      errorsContainer.classList.add('form__errors');
      this.contactFields.appendChild(errorsContainer);
      return errorsContainer;
    }
  }]);

  return Form;
}();

exports["default"] = Form;

			}});


		  ;
			require.define({'dev/js/class/Loader.js': function(exports, require, module) {
				"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Loader = /*#__PURE__*/function () {
  function Loader(el) {
    _classCallCheck(this, Loader);

    this.el = el; // Store default element values

    this.textWrapper = this.el;
    this.text = this.textWrapper.innerText;
    this.fontSize = this.el.style.fontSize;
    this.color = this.el.style.color;
    this.width = this.el.clientWidth;
    this.height = this.el.clientHeight;
    this.background = this.el.style.backgroundColor || this.el.style.background;
    this.el.style.minWidth = this.width + 'px';
    this.el.style.minHeight = this.height + 'px';
  }

  _createClass(Loader, [{
    key: "load",
    value: function load() {
      this.textWrapper.innerText = '';
      this.el.style.width = this.width + 'px';
      this.el.style.height = this.height + 'px';
      var loader = document.createElement('div');
      loader.classList.add('loader');
      loader.innerHTML = '<div></div><div></div><div></div>';
      this.el.appendChild(loader);
      this.el.classList.add('disabled');
    }
  }, {
    key: "success",
    value: function success(message) {
      this.textWrapper.innerText = message;
      this.removeLoader();
    }
  }, {
    key: "error",
    value: function error() {
      var _this = this;

      var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      this.textWrapper.innerText = message;
      setTimeout(function () {
        _this.el.classList.remove('disabled');

        _this.removeLoader();

        _this.resetLabel();
      }, delay);
    }
  }, {
    key: "remove",
    value: function remove() {
      this.el.parentElement.removeChild(this.el);
    }
  }, {
    key: "removeLoader",
    value: function removeLoader() {
      this.el.classList.remove('loading');
      var loader = this.el.querySelector('.loader');
      this.resetSize();
      if (loader) loader.parentElement.removeChild(loader);
    }
  }, {
    key: "reset",
    value: function reset() {
      this.resetLabel();
      this.resetSize();
      this.el.classList.remove('disabled');
    }
  }, {
    key: "resetLabel",
    value: function resetLabel() {
      this.textWrapper.innerText = this.text;
    }
  }, {
    key: "resetSize",
    value: function resetSize() {
      this.el.style.width = null;
      this.el.style.height = null;
    }
  }]);

  return Loader;
}();

exports["default"] = Loader;

			}});


		  ;
			require.define({'dev/js/class/navigation.js': function(exports, require, module) {
				"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _functions = require("../utils/functions");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Navigation = /*#__PURE__*/function () {
  function Navigation() {
    var _this = this;

    _classCallCheck(this, Navigation);

    this.distanceBeforeSticky = window.innerHeight / 4;
    this.body = document.querySelector('body');
    this.header = document.getElementById('site-header');
    this.toggleBtn = document.querySelector('.burger-menu__wrapper');
    this.toggleBtn.addEventListener('click', this.toggleMenu.bind(this));
    window.addEventListener('scroll', this.stickyMenu.bind(this)); // REMOVE NO SCROLL ON PAGE CHANGE

    document.querySelector('body').classList.remove('no-scroll');
    this.header.classList.remove('active');
    this.body.addEventListener('click', function (en) {
      _this.header.classList.remove('active');

      _this.body.classList.remove('no-scroll');

      _this.toggleBtn.classList.remove('cross');
    });
    var menuItems = document.querySelectorAll('.menu-item, .site-logo, .footer_phone-number, .footer-contact');
    menuItems.forEach(function (item) {
      item.addEventListener('click', function (ev) {
        var activeItems = document.querySelectorAll('.current_page_item');
        activeItems.forEach(function (activeItem) {
          return activeItem.classList.remove('current_page_item');
        });
        var link = item.querySelector('a');
        var newActivesLinks = document.querySelectorAll("a[href=\"".concat(link.href, "\"]"));
        link.parentElement.classList.add('current_page_item');
        newActivesLinks.forEach(function (item) {
          return item.parentElement.classList.add('current_page_item');
        });
      });
    });
    var hashtagLinks = document.querySelectorAll('a[href*="#"]');
    hashtagLinks.forEach(function (link) {
      return link.parentElement.classList.remove('current_page_item');
    });
  }

  _createClass(Navigation, [{
    key: "stickyMenu",
    value: function stickyMenu() {
      var header = this.header;

      if (window.pageYOffset > this.distanceBeforeSticky && !this.isSticky()) {
        header.classList.add('sticky'); // addTransition(header, 'slide-in', 300, 'sticky');
      } else if (window.pageYOffset < this.distanceBeforeSticky && this.isSticky()) {
        header.classList.remove('sticky'); // addTransition(header, 'slide-in', 300, '', 'sticky');
      }
    }
  }, {
    key: "isSticky",
    value: function isSticky() {
      return this.header.classList.contains('sticky');
    }
  }, {
    key: "toggleMenu",
    value: function toggleMenu(e) {
      e.stopPropagation();
      this.body.classList.toggle('no-scroll');
      this.header.classList.toggle('active');
      this.toggleBtn.classList.toggle('cross');
    }
  }]);

  return Navigation;
}();

exports["default"] = Navigation;

			}});


		  ;
			require.define({'dev/js/constants/constants.js': function(exports, require, module) {
				"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SCROLLMAGIC_CONTROLLER = void 0;

var ScrollMagic = require("scrollmagic"); // import 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js';


var SCROLLMAGIC_CONTROLLER = new ScrollMagic.Controller();
exports.SCROLLMAGIC_CONTROLLER = SCROLLMAGIC_CONTROLLER;

			}});


		  ;
			require.define({'dev/js/constants/sections.js': function(exports, require, module) {
				"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Banner = _interopRequireDefault(require("../flexibles/Banner.js"));

var _Presentation = _interopRequireDefault(require("../flexibles/Presentation.js"));

var _Watches = _interopRequireDefault(require("../flexibles/Watches.js"));

var _Content = _interopRequireDefault(require("../flexibles/Content.js"));

var _ContactForm = _interopRequireDefault(require("../flexibles/ContactForm.js"));

var _SingleWatch = _interopRequireDefault(require("../flexibles/SingleWatch.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  'presentation': _Presentation["default"],
  'banner': _Banner["default"],
  'watches': _Watches["default"],
  'content': _Content["default"],
  'single__watches': _SingleWatch["default"],
  'contact': _ContactForm["default"]
};
exports["default"] = _default;

			}});


		  
			require.define({'dev/js/flexibles/Banner.js': function(exports, require, module) {
				"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _gsap = require("gsap");

var _constants = require("../constants/constants");

var _scrollmagic = _interopRequireDefault(require("scrollmagic"));

var _functions = require("../utils/functions.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Banner = /*#__PURE__*/function () {
  function Banner() {
    _classCallCheck(this, Banner);

    this.sections = document.querySelectorAll('.banner');
    this.animate();
  }

  _createClass(Banner, [{
    key: "animate",
    value: function animate() {
      this.sections.forEach(function (section) {
        // if(!section.classList.contains('animated')) return;
        var timeline = new _gsap.TimelineLite();
        var title = section.querySelectorAll('.banner__title.animated');

        if (title.length > 0) {
          var titleAnimation = _gsap.TweenMax.staggerFromTo(title, .6, {
            x: -300,
            autoAlpha: 0
          }, {
            x: 0,
            autoAlpha: 1
          }, .2);

          timeline.add(titleAnimation);
        }

        var subtitle = section.querySelectorAll('.banner__subtitle.animated');

        if (subtitle.length > 0) {
          var subtitleAnimation = _gsap.TweenMax.staggerFromTo(subtitle, .6, {
            x: 300,
            autoAlpha: 0
          }, {
            x: 0,
            autoAlpha: 1
          }, .2);

          timeline.add(subtitleAnimation);
        }

        var text = section.querySelectorAll('.banner__description.animated');

        if (text.length > 0) {
          var textAnimation = _gsap.TweenMax.staggerFromTo(text, .6, {
            x: 300,
            autoAlpha: 0
          }, {
            x: 0,
            autoAlpha: 1
          }, .2);

          timeline.add(textAnimation);
        }

        new _scrollmagic["default"].Scene({
          triggerElement: section,
          triggerHook: 0.95,
          offset: 150,
          reverse: true
        }).setTween(timeline).addTo(_constants.SCROLLMAGIC_CONTROLLER);
      });
    }
  }]);

  return Banner;
}();

exports["default"] = Banner;

			}});


		  ;
			require.define({'dev/js/flexibles/ContactForm.js': function(exports, require, module) {
				"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _gsap = require("gsap");

var _constants = require("../constants/constants");

var _scrollmagic = _interopRequireDefault(require("scrollmagic"));

var _Form = _interopRequireDefault(require("../class/Form.js"));

var _Loader = _interopRequireDefault(require("../class/Loader.js"));

var _functions = require("../utils/functions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ContactForm = /*#__PURE__*/function () {
  function ContactForm() {
    var _this = this;

    _classCallCheck(this, ContactForm);

    _defineProperty(this, "submitForm", function (form, loader) {
      return function (e) {
        e.preventDefault();

        if (form.validate()) {
          loader.load();
          var args = {
            action: 'submit_form',
            form: form.el
          };
          (0, _functions.post)(args, _this.submitResponses(form, loader), true);
        }
      };
    });

    _defineProperty(this, "submitResponses", function (form, loader) {
      return function (response) {
        var result = JSON.parse(Array.of(response));

        if (result.success) {
          loader.success(result.data);
        } else {
          form.displayErrors([result.data]);
          loader.reset();
        }
      };
    });

    this.sections = document.querySelectorAll('.contact');
    this.sections.forEach(function (section) {
      var form = new _Form["default"](section.querySelector('form'));
      var submit = new _Loader["default"](form.el.querySelector('.contact-form__cta-submit'));
      form.el.addEventListener('submit', _this.submitForm(form, submit));
    });
    this.animate();
  }

  _createClass(ContactForm, [{
    key: "animate",
    value: function animate() {
      this.sections.forEach(function (section) {
        var image = section.querySelectorAll('.contact__image-block');
        var form = section.querySelectorAll('.contact-form');

        var imageAnimation = _gsap.TweenMax.staggerFromTo(image, .5, {
          x: -300,
          autoAlpha: 0
        }, {
          x: 0,
          autoAlpha: 1
        }, .15);

        var formAnimation = _gsap.TweenMax.staggerFromTo(form, .5, {
          x: 300,
          autoAlpha: 0
        }, {
          x: 0,
          autoAlpha: 1
        }, .15);

        var timeline = new _gsap.TimelineLite();
        timeline.add(imageAnimation).add(formAnimation);
        new _scrollmagic["default"].Scene({
          triggerElement: section,
          triggerHook: 0.95,
          offset: 100,
          reverse: true
        }).setTween(timeline).addTo(_constants.SCROLLMAGIC_CONTROLLER);
      });
    }
  }]);

  return ContactForm;
}();

exports["default"] = ContactForm;

			}});


		  ;
			require.define({'dev/js/flexibles/Content.js': function(exports, require, module) {
				"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _gsap = require("gsap");

var _constants = require("../constants/constants");

var _scrollmagic = _interopRequireDefault(require("scrollmagic"));

var _functions = require("../utils/functions.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Content = /*#__PURE__*/function () {
  function Content() {
    _classCallCheck(this, Content);

    this.sections = document.querySelectorAll('.content');
    (0, _functions.initSwipers)(this.sections, {
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      loop: true,
      autoplay: {
        delay: 6000
      },
      autoHeight: true,
      effect: 'fade'
    });
    this.animate();
  }

  _createClass(Content, [{
    key: "animate",
    value: function animate() {
      this.sections.forEach(function (section) {
        var layoutRight = section.querySelector('.content--layout-right');
        var images = section.querySelectorAll('.content__images .images');
        var imagesFromVars = layoutRight ? {
          x: 300,
          autoAlpha: 0
        } : {
          x: -300,
          autoAlpha: 0
        };
        var imagesToVars = {
          x: 0,
          autoAlpha: 1
        };

        var imagesAnimation = _gsap.TweenMax.staggerFromTo(images, .6, imagesFromVars, imagesToVars, .2);

        var text = section.querySelectorAll('.content__text-part');
        var textFromVars = layoutRight ? {
          x: -300,
          autoAlpha: 0
        } : {
          x: 300,
          autoAlpha: 0
        };
        var textToVars = {
          x: 0,
          autoAlpha: 1
        };

        var textAnimation = _gsap.TweenMax.staggerFromTo(text, .6, textFromVars, textToVars, .2);

        var timeline = new _gsap.TimelineLite();
        timeline.add(imagesAnimation).add(textAnimation);
        new _scrollmagic["default"].Scene({
          triggerElement: section,
          triggerHook: 0.95,
          offset: 150,
          reverse: true
        }).setTween(timeline).addTo(_constants.SCROLLMAGIC_CONTROLLER);
      });
    }
  }]);

  return Content;
}();

exports["default"] = Content;

			}});


		  ;
			require.define({'dev/js/flexibles/Init.js': function(exports, require, module) {
				"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = initFlexibleSections;

var _sections = _interopRequireDefault(require("../constants/sections.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function initFlexibleSections() {
  var activeSections = [];

  for (var section in _sections["default"]) {
    if (document.querySelector(".".concat(section))) try {
      activeSections.push(new _sections["default"][section]());
    } catch (e) {
      console.error(section, e);
    }
  }

  return activeSections;
}

			}});


		  ;
			require.define({'dev/js/flexibles/Presentation.js': function(exports, require, module) {
				"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _gsap = require("gsap");

var _constants = require("../constants/constants");

var _scrollmagic = _interopRequireDefault(require("scrollmagic"));

var _functions = require("../utils/functions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Presentation = /*#__PURE__*/function () {
  function Presentation() {
    _classCallCheck(this, Presentation);

    this.sections = document.querySelectorAll('.presentation');
    this.sections.forEach(function (section) {
      var button = section.querySelector('.presentation__arrow');
      button.addEventListener('click', _functions.scrollToElement);
    });
    this.animate();
  }

  _createClass(Presentation, [{
    key: "animate",
    value: function animate() {
      this.sections.forEach(function (section) {
        var logo = section.querySelectorAll('.presentation__logo');

        var logoAnimation = _gsap.TweenMax.staggerFromTo(logo, .8, {
          autoAlpha: 0
        }, {
          autoAlpha: 1
        }, .2);

        var textLeft = section.querySelectorAll('.logo-text--left');

        var textLeftAnimation = _gsap.TweenMax.staggerFromTo(textLeft, .75, {
          x: -100,
          autoAlpha: 0
        }, {
          x: 0,
          autoAlpha: 1
        }, .2);

        var textRight = section.querySelectorAll('.logo-text--right');

        var textRightAnimation = _gsap.TweenMax.staggerFromTo(textRight, .75, {
          x: 100,
          autoAlpha: 0
        }, {
          x: 0,
          autoAlpha: 1
        }, .2);

        var timeline = new _gsap.TimelineLite();
        timeline.add(logoAnimation).add(textLeftAnimation).add(textRightAnimation);
        new _scrollmagic["default"].Scene({
          triggerElement: section,
          triggerHook: 0.95,
          offset: 0,
          reverse: true
        }).setTween(timeline).addTo(_constants.SCROLLMAGIC_CONTROLLER);
      });
    }
  }]);

  return Presentation;
}();

exports["default"] = Presentation;

			}});


		  ;
			require.define({'dev/js/flexibles/SingleWatch.js': function(exports, require, module) {
				"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _gsap = require("gsap");

var _constants = require("../constants/constants");

var _scrollmagic = _interopRequireDefault(require("scrollmagic"));

var _functions = require("../utils/functions.js");

var _functions2 = require("../utils/functions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var jQuery = require('jquery');

(function ($) {
  var lightbox = require('lightbox2');

  lightbox.option({
    'alwaysShowNavOnTouchDevices': true,
    'resizeDuration': 450,
    'wrapAround': true,
    'disableScrolling': true,
    'fitImagesInViewport': true
  });
})(jQuery);

var SingleWatch = /*#__PURE__*/function () {
  function SingleWatch() {
    var _this = this;

    _classCallCheck(this, SingleWatch);

    this.body = document.querySelector('body');
    this.sections = document.querySelectorAll('.single__watches.desktop');
    this.aside = document.querySelector('.single__watches__text-part-wrapper');
    this.sectionsMobile = document.querySelectorAll('.single__watches.mobile');
    (0, _functions.initSwipers)(this.sectionsMobile, {
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      direction: 'vertical',
      loop: true,
      autoplay: true,
      autoHeight: true,
      effect: 'fade'
    });
    this.animate();
    setTimeout(function () {
      return _this.scrollToImage();
    }, 250);
  }

  _createClass(SingleWatch, [{
    key: "animate",
    value: function animate() {
      this.sections.forEach(function (section) {
        var layoutRight = section.querySelector('.content--layout-right');
        var images = section.querySelectorAll('.single__watches-images img');
        var imagesFromVars = layoutRight ? {
          x: 300,
          autoAlpha: 0
        } : {
          x: -300,
          autoAlpha: 0
        };
        var imagesToVars = {
          x: 0,
          autoAlpha: 1
        };

        var imagesAnimation = _gsap.TweenMax.staggerFromTo(images, .6, imagesFromVars, imagesToVars, .2);

        var text = section.querySelectorAll('.single__watches__text-part');
        var textFromVars = layoutRight ? {
          x: -300,
          autoAlpha: 0
        } : {
          x: 300,
          autoAlpha: 0
        };
        var textToVars = {
          x: 0,
          autoAlpha: 1
        };

        var textAnimation = _gsap.TweenMax.staggerFromTo(text, .6, textFromVars, textToVars, .2);

        var timeline = new _gsap.TimelineLite();
        timeline.add(imagesAnimation);
      });
    }
  }, {
    key: "scrollToImage",
    value: function scrollToImage() {
      this.sections.forEach(function (section) {
        var bullets = section.querySelectorAll('.pagination-bullet');
        var images = section.querySelectorAll('img');
        images.forEach(function (image, index) {
          new _scrollmagic["default"].Scene({
            triggerElement: image,
            duration: image.clientHeight
          }).on('enter', function (e) {
            setActiveBullet(bullets[index]);
          }).addTo(_constants.SCROLLMAGIC_CONTROLLER);
        });
        bullets.forEach(function (bullet, index) {
          bullet.addEventListener('click', function (event) {
            var headerOffset = index === 0 ? 144 : 90;

            var scrollFn = _functions2.scrollToElement.bind(this);

            scrollFn(event, headerOffset);
          });
        });

        var setActiveBullet = function setActiveBullet(bullet) {
          var bulletActive = section.querySelector('.pagination-bullet.active');
          if (bulletActive) bulletActive.classList.remove('active');
          bullet.classList.add('active');
        };
      });
    }
  }]);

  return SingleWatch;
}();

exports["default"] = SingleWatch;

			}});


		  ;
			require.define({'dev/js/flexibles/Watches.js': function(exports, require, module) {
				"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _gsap = require("gsap");

var _constants = require("../constants/constants");

var _scrollmagic = _interopRequireDefault(require("scrollmagic"));

var _functions = require("../utils/functions.js");

var _objectFitImages = _interopRequireDefault(require("object-fit-images"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Watches = /*#__PURE__*/function () {
  function Watches() {
    _classCallCheck(this, Watches);

    this.sections = document.querySelectorAll('.watches');
    (0, _functions.initSwipers)(this.sections, {
      loop: true,
      autoplay: false,
      breakpoints: {
        320: {
          slidesPerView: 2,
          spaceBetween: 15,
          centeredSlides: true,
          setWrapperSize: true
        },
        730: {
          slidesPerView: 3,
          spaceBetween: 0,
          centeredSlides: true,
          setWrapperSize: true
        },
        950: {
          slidesPerView: 4,
          spaceBetween: 10,
          centeredSlides: false,
          setWrapperSize: true
        },
        1080: {
          slidesPerView: 5,
          spaceBetween: 10,
          centeredSlides: false,
          setWrapperSize: true
        }
      }
    });
    this.animate();
  }

  _createClass(Watches, [{
    key: "animate",
    value: function animate() {
      this.sections.forEach(function (section) {
        var timeline = new _gsap.TimelineLite();
        var title = section.querySelectorAll('.watches__title');

        if (title.length > 0) {
          var titleAnimation = _gsap.TweenMax.staggerFromTo(title, .6, {
            x: -300,
            autoAlpha: 0
          }, {
            x: 0,
            autoAlpha: 1
          }, .2);

          timeline.add(titleAnimation);
        }

        var subtitle = section.querySelectorAll('.watches__subtitle');

        if (subtitle.length > 0) {
          var subtitleAnimation = _gsap.TweenMax.staggerFromTo(subtitle, .6, {
            x: 300,
            autoAlpha: 0
          }, {
            x: 0,
            autoAlpha: 1
          }, .2);

          timeline.add(subtitleAnimation);
        }

        var watch = section.querySelectorAll('.watch');

        if (watch.length > 0) {
          var watchAnimation = _gsap.TweenMax.staggerFromTo(watch, .8, {
            autoAlpha: 0
          }, {
            autoAlpha: 1
          }, .2);

          timeline.add(watchAnimation);
        }

        new _scrollmagic["default"].Scene({
          triggerElement: section,
          triggerHook: 0.95,
          offset: 0,
          reverse: true
        }).setTween(timeline).addTo(_constants.SCROLLMAGIC_CONTROLLER);
      });
    }
  }]);

  return Watches;
}();

exports["default"] = Watches;

			}});


		  ;
			require.define({'dev/js/utils/functions.js': function(exports, require, module) {
				"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initSwipers = initSwipers;
exports.scrollTopOnLinksCurrentUrl = scrollTopOnLinksCurrentUrl;
exports.post = post;
exports.containsSection = containsSection;
exports.addTransition = addTransition;
exports.addEvents = addEvents;
exports.scrollToTop = scrollToTop;
exports.scrollToElement = scrollToElement;
exports.getNavigator = getNavigator;
exports.toggleScroll = toggleScroll;
exports.getParameterByName = getParameterByName;
exports.pageEnabled = pageEnabled;
exports.checkMail = checkMail;
exports.checkPhoneNumber = checkPhoneNumber;
exports.checkDate = checkDate;

function initSwipers(swipersContainer, properties) {
  var className, hasNavigation, hasPagination, navigation, pagination, slidesCount;
  var swipers = [];

  for (var i = 0; i < swipersContainer.length; i++) {
    slidesCount = swipersContainer[i].querySelectorAll('.swiper-slide').length;
    if (slidesCount <= 1) continue; // Getting the first class name then adds a key to it in order to differentiate each swipers

    className = swipersContainer[i].className.split(' ')[0] + '--' + i;
    swipersContainer[i].classList.add(className); // Checks if current swiper has navigation or pagination

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

    swipers.push(new Swiper('.' + className + ' .swiper-container', properties));
    swipersContainer[i].classList.add('swiper-initialized');
  }

  return swipers;
} // Adds a scroll top if link destination is the same as current page


function scrollTopOnLinksCurrentUrl() {
  var currentUrl = window.location.href;

  if (currentUrl[currentUrl.length - 1] == '/') {}

  currentUrl = currentUrl.substring(0, currentUrl.length - 1);
  if (currentUrl.indexOf('#') != -1) currentUrl = currentUrl.substring(0, currentUrl.indexOf('#'));
  var currentPageLinks = document.querySelectorAll('a[href="' + currentUrl + '"]');
  addEvents(currentPageLinks, 'click', scrollToTop);
}

function post(args, callback) {
  var isFormData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var params;
  var request = new XMLHttpRequest();

  if (isFormData) {
    params = new FormData(args.form);

    for (var key in args) {
      if (key != 'form') params.append(key, args[key]);
    }
  } else {
    params = '';

    for (var _key in args) {
      params += _key + '=' + args[_key] + '&';
    }

    params = params.substring(0, params.length - 1);
  }

  request.onload = function () {
    if (callback) {
      if (request.status >= 200 && request.status < 400) {
        callback(request.response);
      } else {
        callback({
          success: false,
          data: {
            error: 'server'
          }
        });
      }
    }
  };

  request.onerror = function () {
    callback({
      success: false,
      data: {
        error: 'connection'
      }
    });
  };

  request.open('POST', site.ajaxurl, true);
  if (!isFormData) request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  request.send(params);
}

function containsSection(className) {
  return document.querySelector('.' + className) !== null;
}

function addTransition(target, className, duration) {
  var exitClass = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  var classToRemove = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';

  if (target.dataset.transition != 'true') {
    target.classList.add(className);
    target.dataset.transition = true;
    setTimeout(function () {
      target.classList.remove(className);
      target.dataset.transition = false;
      if (exitClass) target.classList.add(exitClass);
      if (classToRemove) target.classList.remove(classToRemove);
    }, duration);
  }
}

function addEvents(targets, method, callback) {
  if (!NodeList.prototype.isPrototypeOf(targets) && !Array.isArray(targets)) {
    targets.addEventListener(method, callback);
  } else {
    for (var i = 0; i < targets.length; i++) {
      if (targets[i] === null) continue;

      if (!NodeList.prototype.isPrototypeOf(targets[i]) && !Array.isArray(targets[i])) {
        targets[i].addEventListener(method, callback);
      } else {
        for (var j = 0; j < targets[i].length; j++) {
          targets[i][j].addEventListener(method, callback);
        }
      }
    }
  }
}

function scrollToTop(e) {
  if (e) e.preventDefault();
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
}

function scrollToElement(e) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 90;

  try {
    e.preventDefault();
    var element = document.querySelector(this.dataset.scrollto);
    var elementPosition = element.getBoundingClientRect().top;
    var topOffset = window.pageYOffset + elementPosition - offset;
    window.scrollTo({
      top: topOffset,
      left: 0,
      behavior: 'smooth'
    });
  } catch (error) {
    console.error(error);
  }
}

function getNavigator() {
  if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
    return 'opera';
  } else if (navigator.userAgent.indexOf("Chrome") != -1) {
    return 'chrome';
  } else if (navigator.userAgent.indexOf("Safari") != -1) {
    return 'safari';
  } else if (navigator.userAgent.indexOf("Firefox") != -1) {
    return 'firefox';
  } else if (navigator.userAgent.indexOf("MSIE") != -1 || !!document.documentMode == true) {
    return 'IE';
  } else {
    return 'unknown';
  }
}

function toggleScroll() {
  var body = document.querySelector('body');
  if (body) body.classList.toggle('no-scroll');
}

function getParameterByName(name) {
  var url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function pageEnabled() {
  var enabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var pageLockContainer = document.getElementById('page-lock');

  if (enabled) {
    pageLockContainer.classList.remove('locked');
  } else {
    pageLockContainer.classList.add('locked');
  }
}

function checkMail(mail) {
  var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(mail);
}

function checkPhoneNumber(number) {
  var regex = /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/;
  return regex.test(number);
}

function checkDate(date) {
  var regex = /^([0][1-9]|[1][0-9]|[2][0-9]|[3][0-1])\/([0][1-9]|[1][0-2])\/([1][9][0-9][0-9]|[2][0][0-9]{2})$/;
  return regex.test(date);
}

			}});


		  ;require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');

require('dev/js/App.js');
//# sourceMappingURL=app-bundle.js.map