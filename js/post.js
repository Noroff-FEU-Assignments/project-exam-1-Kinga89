import { goBack } from "./utils.js";
const previousPage = document.querySelector(".fa-arrow-left");
previousPage.addEventListener("click", goBack);

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
      
    postContainer.innerHTML = `
        <h1>${result.title.rendered}</h1>
        <p>${result.date}</p>
        <p>Written by ${result.date}</p>
        <div class="post-image">
        <img src="${result}" alt="">
        </div>
        <div class="post-text">
        <p>${result.content.rendered}</p>
        </div>
        <div class="comment-section"><p>${result._links.replies[0].href}</p></div>
        `;

 
  } catch (error) {
    postContainer.innerHTML = `<div id="error_msg">An error occured when calling the API </div>`;
    console.log(error);
  }
}
fetchPostDetails();
