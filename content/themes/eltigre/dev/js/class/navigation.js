import { addTransition } from '../utils/functions';

export default class Navigation {
    constructor() {
        this.distanceBeforeSticky = window.innerHeight / 10;
        this.body = document.querySelector('body');
        this.header = document.getElementById('site-header');
        this.toggleBtn = document.querySelector('.burger-menu__wrapper');

        this.toggleBtn.addEventListener('click', this.toggleMenu.bind(this));
        window.addEventListener('scroll', this.stickyMenu.bind(this));

        // REMOVE NO SCROLL ON PAGE CHANGE
        document.querySelector('body').classList.remove('no-scroll');
        this.header.classList.remove('active');
        this.body.classList.remove('overlay');

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
        if (window.scrollY > this.distanceBeforeSticky && !this.isSticky()) {
            header.classList.add('sticky');
            // addTransition(header, 'slide-in', 300, 'sticky');
        }
        else if (window.scrollY < this.distanceBeforeSticky && this.isSticky()) {
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
        this.body.classList.toggle('overlay');
        this.toggleBtn.classList.toggle('cross');
    }
}