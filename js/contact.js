import { goBack } from "./utils.js";
const previousPage = document.querySelector(".fa-arrow-left");
previousPage.addEventListener("click", goBack);

const contactForm = document.querySelector(".contact-form");
const form = document.querySelector("#form");
const sectionForm = document.querySelector(".section-form");

const name = document.querySelector("#name");
const nameError = document.querySelector("#nameError");

const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");

const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subjectError");

const message = document.querySelector("#message");
const messageError = document.querySelector("#messageError");

const sendButton = document.querySelector(".send-button");

function validateForm() {
 
  /*Checks if the name has more than 5 characters*/
  if (checkLength(name.value, 5) === true) {
    nameError.style.display = "none";
    name.style.borderColor = "#4cd038";
  } else {
    nameError.style.display = "block";
    name.style.borderColor = "red";
  }

  /*Checks if the email is correct*/
  if (validateEmail(email.value) === true) {
    emailError.style.display = "none";
    email.style.borderColor = "#4cd038";
  } else {
    emailError.style.display = "block";
    email.style.borderColor = "red";
  }

  /*Checks if the subject has more than 15 characters*/
  if (checkLength(subject.value, 15) === true) {
    subjectError.style.display = "none";
    subject.style.borderColor = "#4cd038";
  } else {
    subjectError.style.display = "block";
    subject.style.borderColor = "red";
  }

  /*Checks if the messaged has more than 25 characters*/
  if (checkLength(message.value, 25) === true) {
    messageError.style.display = "none";
    message.style.borderColor = "#4cd038";
  } else {
    messageError.style.display = "block";
    message.style.borderColor = "red";
  }

  let validForm =
    checkLength(name.value, 5) &&
    validateEmail(email.value) &&
    checkLength(subject.value, 15) &&
    checkLength(message.value, 25);     
}



console.log(name.value);
console.log(email.value);
console.log(subject.value);
console.log(message.value);

console.log(validateForm);

form.addEventListener("submit", validateForm);
function validateEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}

function checkLength(value, len) {
  if (value.trim().length > len) {
    return true;
  } else {
    return false;
  }
}
