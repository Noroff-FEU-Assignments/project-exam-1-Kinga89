import { goBack } from "./utils.js";
const previousPage = document.querySelector(".fa-arrow-left");
previousPage.addEventListener("click", goBack);

document.title = "About | Urban Planning Blog"