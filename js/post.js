import { goBack } from "./utils.js";
const previousPage = document.querySelector(".fa-arrow-left");
previousPage.addEventListener("click", goBack);

/* HAMBURGER MENU MOBILE*/
const hamburgerOpen = document.querySelector(".fa-bars");
const hamburgerClose = document.querySelector(".fa-times");
const navMobile = document.querySelector("nav ul");

import { hamburgerMenuOpen,hamburgerMenuClose } from "./utils.js";

hamburgerOpen.addEventListener("click", hamburgerMenuOpen);
hamburgerClose.addEventListener("click", hamburgerMenuClose);

const postContainer = document.querySelector(".post-container");

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

console.log(id);

const detailsURL = "https://blog.kingakot.com/wp-json/wp/v2/posts/" + id;

async function fetchPostDetails() {
  try {
    const details = await fetch(detailsURL);
    const result = await details.json();
    console.log(result);
    document.title = `${result.title.rendered}`;

    const parser = new DOMParser();
    const content1 = result;
    const parsedDocument = parser.parseFromString(
      content1.content.rendered,
      "text/html"
    );
    const img = parsedDocument.querySelector("img");
    console.log(img.attributes);

    const parserTxt = new DOMParser();
    const content2 = result;
    const parsedDocumentTxt = parserTxt.parseFromString(
      content2.content.rendered,
      "text/html"
    );
    const txt = parsedDocumentTxt.querySelectorAll("p");

    let newTxt = Array.from(txt);
    console.log(newTxt);

    console.log(img.attributes.alt.nodeValue);

    let initialDate = result.date;
    let formattedDate = new Date(initialDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour12: false
    })
    console.log(formattedDate)

    postContainer.innerHTML = `
        <h1>${result.title.rendered}</h1>
        <p>${formattedDate}</p>
        <div class="post-image">
        <img src="${img.attributes.src.nodeValue}" class="image" alt="${img.attributes.alt.nodeValue}">
        </div>
        <div class="modal">
        <img src="${img.attributes.src.nodeValue}" class="modal-img" alt="${img.attributes.alt.nodeValue}">
        </div>
        <div class="post-text">
        </div>
        `;

    const postText = document.querySelector(".post-text");
    newTxt.forEach(function (post) {
      postText.innerHTML += `
          <p>${post.innerHTML}</p>
          `;
    });

    const modal = document.querySelector(".modal");

    const postImage = document.querySelector(".post-image img");
    const modalImage = document.querySelector(".modal-img");
    postImage.onclick = function () {
      modal.style.display = "block";
      modalImage.src = this.src;
    };

    modal.onclick = function () {
      modal.style.display = "none";
    };
  } catch (error) {
    postContainer.innerHTML = `<div id="error_msg">An error occured when calling the API </div>`;
    console.log(error);
  }
}
fetchPostDetails();
