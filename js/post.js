import { goBack } from "./utils.js";
const previousPage = document.querySelector(".fa-arrow-left");
previousPage.addEventListener("click", goBack);

const postContainer = document.querySelector(".post-container");

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

console.log(id);

const detailsURL = "http://localhost:8383/wp-json/wp/v2/posts/" + id;

async function fetchPostDetails () {
    try {
        const details = await fetch(detailsURL);
        const result = await details.json();
        console.log(result);

        postContainer.innerHTML = `
        <h1>${result.title.rendered}</h1>
        <div class="post-image">
        <img src="${result}" alt="">
        </div>
        <div class="post-text">
        <p>${result.content.rendered}</p>
        </div>
        
        `

        

    } catch (error){
        postContainer.innerHTML = `<div id="error_msg">An error occured when calling the API </div>`;
        console.log (error)
    } 

}
fetchPostDetails();