const addMorePosts = "&per_page=15";

const baseURL =
  "https://blog.kingakot.com/wp-json/wp/v2/posts?_embed=1&orderby=date&order=desc" + addMorePosts;

const sliderContainer = document.querySelector(".slider-container");
  document.title = "Home | Urban Planning Blog"

/* HAMBURGER MENU MOBILE*/
const hamburgerOpen = document.querySelector(".fa-bars");
const hamburgerClose = document.querySelector(".fa-times");
const navMobile = document.querySelector("nav ul");

import { hamburgerMenuOpen,hamburgerMenuClose } from "./utils.js";

hamburgerOpen.addEventListener("click", hamburgerMenuOpen);
hamburgerClose.addEventListener("click", hamburgerMenuClose);

async function fetchPosts() {
  try {
    const response = await fetch(baseURL);
    const posts = await response.json();
    console.log(posts);
    sliderContainer.innerHTML = "";
  

  

    /**************** ALL POSTS **********************/
    posts.forEach(function (blogPost) {
  let initialDate = blogPost.date;
    let formattedDate = new Date(initialDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour12: false
    })
    console.log(formattedDate)

      sliderContainer.innerHTML += `
             <div class=slider-carousel>
            <div class="slide">   
            <a href= /post.html?id=${blogPost.id}>
                <div class="card-image">
                <img src="${blogPost._embedded["wp:featuredmedia"][0].source_url}" alt="${blogPost._embedded["wp:featuredmedia"][0].alt_text}">
                </div>
                <div class="card-text">
                <h3>${blogPost.title.rendered}</h3>
                <p>${formattedDate}</p>
                <p>Author: ${blogPost._embedded.author[0].name}</p>
                <p>${blogPost.excerpt.rendered}</p>
                <p class="read-more-btn">Read more</p>
                </div>
                </a>   
             </div>
             </div>
            `;
    });

    /**************** IMAGE SLIDER **********************/
    let sliderCarousel = document.querySelectorAll(".slider-carousel");
    const arrowRight = document.querySelector(".fa-arrow-right");
    const arrowLeft = document.querySelector(".fa-arrow-left");

    let counter = 1;
    const size = sliderCarousel[0].clientWidth;

    arrowRight.onclick = () => {
      sliderContainer.style.transition = "transform 0.5s ease-in-out";
      counter++;
      sliderContainer.style.transform = "translateX(" + -size * counter + "px)";

      console.log(counter);
    };

    arrowLeft.onclick = () => {
      sliderContainer.style.transition = "transform 0.5s ease-in-out";
      counter--;
      sliderContainer.style.transform = "translateX(" + -size * counter + "px)";

      console.log(counter);
    };



  } catch (error) {}
}

fetchPosts();
