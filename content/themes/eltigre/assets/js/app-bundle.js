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

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _scrollmagic = _interopRequireDefault(require("scrollmagic"));

var _gsap = _interopRequireDefault(require("gsap"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

var App = /*#__PURE__*/function () {
  function App() {
    _classCallCheck(this, App);

    this.scrollMagicController = new _scrollmagic["default"].Controller();
    this.scenes = [];
    this.revealManager();
    this.debugManager();
  }

  _createClass(App, [{
    key: "revealManager",
    value: function revealManager() {
      var _this2 = this;

      var _this = this;

      document.querySelectorAll('[gsap-reveal]').forEach(function (el) {
        var tween = _gsap["default"].fromTo(el, 1, {
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
        }).setTween(tween).addTo(_this2.scrollMagicController);

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
  new ElTigreBarba();
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


		  
			require.define({'dev/js/class/Barba.js': function(exports, require, module) {
				"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _core = _interopRequireDefault(require("@barba/core"));

var _gsap = _interopRequireDefault(require("gsap"));

var _App = _interopRequireDefault(require("../App.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ElTigreBarba = function ElTigreBarba() {
  _classCallCheck(this, ElTigreBarba);

  _core["default"].init({
    sync: true,
    transitions: [{
      leave: function leave(_ref) {
        var current = _ref.current,
            next = _ref.next,
            trigger = _ref.trigger;

        try {
          return new Promise(function (resolve) {
            _gsap["default"].to(current.container, 0.75, {
              autoAlpha: 0,
              x: 150,
              onComplete: function onComplete() {
                current.container.style.display = 'none';
                resolve();
              }
            });
          });
        } catch (e) {
          console.log('Barba: ' + e);
        }
      },
      enter: function enter(_ref2) {
        var current = _ref2.current,
            next = _ref2.next,
            trigger = _ref2.trigger;
        console.log(next);

        try {
          return new Promise(function (resolve) {
            var anchorTarget = next.url.href.split('#').pop();
            var scrollPosition = document.getElementById(anchorTarget) ? document.getElementById(anchorTarget).offsetTop - 150 : 0;
            window.scrollTo(0, scrollPosition);
            new _App["default"]();

            _gsap["default"].from(next.container, 0.75, {
              autoAlpha: 0,
              x: -150,
              onComplete: function onComplete() {
                next.container.style.transform = 'none';
                resolve();
              }
            });
          });
        } catch (e) {
          console.log('Barba: ' + e);
        }
      }
    }]
  });
};

exports["default"] = ElTigreBarba;

			}});


		  ;require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');

require('dev/js/App.js');
//# sourceMappingURL=app-bundle.js.map