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
        this.textWrapper.innerText    = '';
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