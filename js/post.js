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

    const parser = new DOMParser();
    const content1 = result;
    const parsedDocument = parser.parseFromString(
      content1.content.rendered,
      "text/html"
    );
    const img = parsedDocument.querySelector("img");
    console.log(img.attributes.src.nodeValue);

    const parserTxt = new DOMParser();
    const content2 = result;
    const parsedDocumentTxt = parserTxt.parseFromString(
      content2.content.rendered,
      "text/html"
    );
    const txt = parsedDocumentTxt.querySelectorAll("p");
 
      
        let newTxt = Array.from(txt)
      console.log(newTxt);
      
      for (let i = 0; i < newTxt.length; i++){
          console.log(newTxt[i].innerHTML);

          
          postContainer.innerHTML = `
        <h1>${result.title.rendered}</h1>
        <p>${result.date}</p>
        <p>Written by ${result.date}</p>
        <div class="post-image">
        <img src="${img.attributes.src.nodeValue}" alt="">
        </div>
        <div class="post-text">
        <p>${newTxt[0].innerHTML}</p>
        </div>
        `;
          
          const textPost = document.querySelectorAll(".post-text");
          textPost.innerHTML = newTxt[i].innerText;
        console.log (textPost)
      }
      
  } catch (error) {
    postContainer.innerHTML = `<div id="error_msg">An error occured when calling the API </div>`;
    console.log(error);
  }
}
fetchPostDetails();
