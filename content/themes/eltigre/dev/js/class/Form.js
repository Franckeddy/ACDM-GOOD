import { checkMail, checkPhoneNumber } from "../utils/functions";
import {TimelineLite} from 'gsap';

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
      if (field.type === 'mail' && !checkMail(field.value)) {
        errors.push('Veuillez entrer une adresse E-Mail valide');
        field.classList.add('error');
      }

      if (field.type === 'tel' && !checkPhoneNumber(field.value)) {
        errors.push('Veuillez entrer un numéro de téléphone valide');
        field.classList.add('error');
      }
    });
    
    if (emptyFields > 0) {                      
      errors.push(`${emptyFields} ${emptyFields > 1 ? 'champs' : 'champ'} requis vide`)
    }

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

    this.tlForm.fromTo(errorsContainer, 1, {left:-100, opacity:0}, {left:0, opacity:1})
  }


  createErrorsContainer() {
    let errorsContainer = document.createElement('div');
    errorsContainer.classList.add('form__errors');

    this.contactFields.appendChild(errorsContainer);

    return errorsContainer;
  }
}
