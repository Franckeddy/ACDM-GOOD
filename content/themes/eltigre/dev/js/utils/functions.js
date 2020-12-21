export function initSwipers(swipersContainer, properties) {
    let className, hasNavigation, hasPagination, navigation, pagination, slidesCount;
    let swipers = [];
    for (let i = 0; i < swipersContainer.length; i++) {
        slidesCount = swipersContainer[i].querySelectorAll('.swiper-slide').length;
        if (slidesCount <= 1) continue;

        // Getting the first class name then adds a key to it in order to differentiate each swipers
        className = swipersContainer[i].className.split(' ')[0] + '--' + i;

        swipersContainer[i].classList.add(className);

        // Checks if current swiper has navigation or pagination
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
}

// Adds a scroll top if link destination is the same as current page
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