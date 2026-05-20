(function () {
  'use strict';

  var OVERLAY_CLASS = 'lb-close-overlay';

  // Filtre les erreurs JS connues provenant de l'instance lightbox2 bundlee dans
  // vendor.js (doublon avec celle de vendor/lightbox.js). Ces erreurs ne cassent
  // pas le lightbox actif mais polluent la console.
  window.addEventListener('error', function (e) {
    var msg = (e && e.message) || '';
    if (msg.indexOf('$lightbox') !== -1 || msg.indexOf('$overlay') !== -1) {
      e.stopImmediatePropagation();
      e.preventDefault();
      return false;
    }
  }, true);

  // Detache le handler de clic delegue de l'instance lightbox2 cassee (bundlee
  // dans vendor.js). Le doublon avec celle de vendor/lightbox.js attache 2 handlers
  // au meme selecteur sur body. On garde uniquement le dernier (celui qui fonctionne).
  function dedupeLightboxClickHandlers() {
    var $ = window.jQuery;
    if (!$ || !$._data) return;
    var events = $._data(document.body, 'events');
    if (!events || !events.click) return;

    var indices = [];
    for (var i = 0; i < events.click.length; i++) {
      var sel = events.click[i].selector || '';
      if (sel.indexOf('data-lightbox') !== -1 || sel.indexOf('rel^=lightbox') !== -1 || sel.indexOf('rel^="lightbox"') !== -1) {
        indices.push(i);
      }
    }

    if (indices.length > 1) {
      for (var k = indices.length - 2; k >= 0; k--) {
        events.click.splice(indices[k], 1);
      }
    }
  }

  function isVisible(el) {
    if (!el) return false;
    var style = window.getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden') return false;
    return el.offsetParent !== null || style.position === 'fixed';
  }

  function makeTriggerHandler(target) {
    return function (e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (!target) return;
      try {
        target.click();
      } catch (err) {
        target.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
      }
    };
  }

  function makeRemoteButton(cls, label, html, target) {
    var b = document.createElement('span');
    b.className = cls;
    b.setAttribute('role', 'button');
    b.setAttribute('tabindex', '0');
    b.setAttribute('aria-label', label);
    b.innerHTML = html;
    var handler = makeTriggerHandler(target);
    b.addEventListener('click', handler);
    b.addEventListener('touchend', handler);
    return b;
  }

  function injectOverlayButton(lightbox) {
    var outer = lightbox.querySelector('.lb-outerContainer');
    if (!outer) return;

    var nativePrev = lightbox.querySelector('.lb-prev');
    var nativeNext = lightbox.querySelector('.lb-next');
    var nativeClose = lightbox.querySelector('.lb-dataContainer .lb-close');
    if (!nativeClose) return;

    // Bouton X overlay (utilise sur desktop)
    if (!outer.querySelector('.' + OVERLAY_CLASS)) {
      var btn = document.createElement('span');
      btn.className = OVERLAY_CLASS;
      btn.setAttribute('role', 'button');
      btn.setAttribute('tabindex', '0');
      btn.setAttribute('aria-label', 'Fermer');
      btn.innerHTML = '&times;';
      var handler = makeTriggerHandler(nativeClose);
      btn.addEventListener('click', handler);
      btn.addEventListener('touchend', handler);
      outer.appendChild(btn);
    }

    // Telecommande en overlay sur le bas de l'image (style lecteur video).
    // Injectee dans .lb-outerContainer pour positionnement absolu relatif a l'image.
    if (!outer.querySelector('.lb-remote')) {
      var remote = document.createElement('div');
      remote.className = 'lb-remote';
      remote.appendChild(makeRemoteButton('lb-remote-btn lb-remote-prev', 'Precedent', '&lsaquo;', nativePrev));
      remote.appendChild(makeRemoteButton('lb-remote-btn lb-remote-close', 'Fermer', '&times;', nativeClose));
      remote.appendChild(makeRemoteButton('lb-remote-btn lb-remote-next', 'Suivant', '&rsaquo;', nativeNext));
      outer.appendChild(remote);
    }
  }

  function scanAndInject() {
    var lightboxes = document.querySelectorAll('.lightbox');
    for (var i = 0; i < lightboxes.length; i++) {
      if (isVisible(lightboxes[i])) {
        injectOverlayButton(lightboxes[i]);
      }
    }
  }

  function watchBody() {
    var observer = new MutationObserver(function () {
      scanAndInject();
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['style', 'class'],
      childList: true,
      subtree: true
    });
  }

  function onTriggerClick() {
    document.addEventListener('click', function (e) {
      var link = e.target.closest && e.target.closest('[data-lightbox]');
      if (link) {
        setTimeout(scanAndInject, 50);
        setTimeout(scanAndInject, 200);
        setTimeout(scanAndInject, 500);
      }
    }, true);
  }

  function init() {
    dedupeLightboxClickHandlers();
    setTimeout(dedupeLightboxClickHandlers, 100);
    setTimeout(dedupeLightboxClickHandlers, 500);
    scanAndInject();
    watchBody();
    onTriggerClick();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
