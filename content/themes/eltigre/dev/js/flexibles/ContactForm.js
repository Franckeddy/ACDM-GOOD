import { TweenMax } from "gsap";
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
            const titleSection = section.querySelectorAll('.section-contact-form--title');
            const titleSectionAnimation = TweenMax.staggerFromTo(titleSection, .25, { x: -100, autoAlpha: 0 }, { x: 0, autoAlpha: 1 }, .15);
            const image = section.querySelectorAll('.block__contact-img');
            const form = section.querySelectorAll('.block__form');

            const imageAnimation = TweenMax.staggerFromTo(image, .5, { x: -150, autoAlpha: 0 }, { x: 0, autoAlpha: 1 }, .15)
            const formAnimation = TweenMax.staggerFromTo(form, .5, { x: 150, autoAlpha: 0 }, { x: 0, autoAlpha: 1 }, .15)

            new ScrollMagic.Scene({
                triggerElement: section,
                triggerHook: 0.95,
                offset: 200,
                reverse: true,
            })
                .setTween([titleSectionAnimation, imageAnimation, formAnimation])
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
                console.log(result.data);
                loader.success(result.data);
            } else {
                form.displayErrors([result.data]);
                loader.reset();
            }
        }
    }
}