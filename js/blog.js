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


const addMorePosts = "&per_page=15";
const baseURL =
"https://blog.kingakot.com/wp-json/wp/v2/posts?_embed" + addMorePosts;

const allPosts = document.querySelector(".all-posts");

async function fetchPosts() {
  try {
    const response = await fetch(baseURL);
    const posts = await response.json();
    console.log(posts);

    document.title = "Urbs & Civitas | Blog Posts"

   /*-------------------------FILTER--------------------------*/
    const radioBtns = document.querySelectorAll("#radio-button");

    const transport = posts.filter(
      (post) => post._embedded["wp:term"][0][0].name === "Transport"
    );
    const architecture = posts.filter(
      (post) => post._embedded["wp:term"][0][0].name === "Architecture"
    );
    const urbanDesign = posts.filter(
      (post) => post._embedded["wp:term"][0][0].slug === "urban-design"
    );
    const cityPlanning = posts.filter(
      (post) => post._embedded["wp:term"][0][0].name === "City Planning"
    );
  
    const radioBtn1 = document.querySelector("#radio-button1");
    const radioBtn2 = document.querySelector("#radio-button2");
    const radioBtn3 = document.querySelector("#radio-button3");
    const radioBtn4 = document.querySelector("#radio-button4");
    const radioBtn5 = document.querySelector("#radio-button5");

    radioBtn1.addEventListener("change", () => {
      allPosts.innerHTML = "";
      posts.forEach(function (blogPost) {
        allPosts.innerHTML += `
            <a href= /post.html?id=${blogPost.id}>
            <div class="blog-post">
            <div class="blog-image">
            <div class="category-label">${blogPost._embedded["wp:term"][0][0].name}</div>
            <div class="image-blogpost">
                <img src="${blogPost._embedded["wp:featuredmedia"][0].source_url}" alt="${blogPost._embedded["wp:featuredmedia"][0].alt_text}">
                </div>
                </div>
            
            <div class="blog-text">
                <h2>${blogPost.title.rendered}</h2>
                <p>Published by: ${blogPost._embedded.author[0].name}</p>
                <p>${blogPost.excerpt.rendered}</p>
                <p class="read-more-post-btn">Read more</p>
            </div>
        </div>
        </a>
            `;
      
      });
    });


    radioBtn2.addEventListener("change", () => {
    loadMoreBtn.style.display = "none";
    allPosts.innerHTML = "";
    transport.forEach(function (blogPost) {
      allPosts.innerHTML += `
            <a href= /post.html?id=${blogPost.id}>
            <div class="blog-post">
            <div class="blog-image">
            <div class="category-label">${blogPost._embedded["wp:term"][0][0].name}</div>
            <div class="image-blogpost">
                <img src="${blogPost._embedded["wp:featuredmedia"][0].source_url}" alt="${blogPost._embedded["wp:featuredmedia"][0].alt_text}">
                </div>
                </div>
            <div class="blog-text">
                <h2>${blogPost.title.rendered}</h2>
                <p>Published by: ${blogPost._embedded.author[0].name}</p>
                <p>${blogPost.excerpt.rendered}</p>
                <p class="read-more-post-btn">Read more</p>
            </div>
        </div>
        </a>
            `;
    });
      
    })

    radioBtn3.addEventListener("change", () => {
      loadMoreBtn.style.display = "none";
      allPosts.innerHTML = "";
      architecture.forEach(function (blogPost) {
        allPosts.innerHTML += `
              <a href= /post.html?id=${blogPost.id}>
              <div class="blog-post">
              <div class="blog-image">
              <div class="category-label">${blogPost._embedded["wp:term"][0][0].name}</div>
              <div class="image-blogpost">
                  <img src="${blogPost._embedded["wp:featuredmedia"][0].source_url}" alt="${blogPost._embedded["wp:featuredmedia"][0].alt_text}">
                  </div>
                  </div>
              
              <div class="blog-text">
                  <h2>${blogPost.title.rendered}</h2>
                  <p>Published by: ${blogPost._embedded.author[0].name}</p>
                  <p>${blogPost.excerpt.rendered}</p>
                  <p class="read-more-post-btn">Read more</p>
              </div>
          </div>
          </a>
              `;
     
        
      })
      });
        
    radioBtn4.addEventListener("change", () => {
      loadMoreBtn.style.display = "none";
        allPosts.innerHTML = "";
        urbanDesign.forEach(function (blogPost) {
          allPosts.innerHTML += `
                <a href= /post.html?id=${blogPost.id}>
                <div class="blog-post">
                <div class="blog-image">
                <div class="category-label">${blogPost._embedded["wp:term"][0][0].name}</div>
                <div class="image-blogpost">
                    <img src="${blogPost._embedded["wp:featuredmedia"][0].source_url}" alt="${blogPost._embedded["wp:featuredmedia"][0].alt_text}">
                    </div>
                    </div>
                
                <div class="blog-text">
                    <h2>${blogPost.title.rendered}</h2>
                    <p>Published by: ${blogPost._embedded.author[0].name}</p>
                    <p>${blogPost.excerpt.rendered}</p>
                    <p class="read-more-post-btn">Read more</p>
                </div>
            </div>
            </a>
                `;
       
          
        })
      });
    
    radioBtn5.addEventListener("change", () => {
      loadMoreBtn.style.display = "none";
        allPosts.innerHTML = "";
        cityPlanning.forEach(function (blogPost) {
          allPosts.innerHTML += `
                <a href= /post.html?id=${blogPost.id}>
                <div class="blog-post">
                <div class="blog-image">
                <div class="category-label">${blogPost._embedded["wp:term"][0][0].name}</div>
                <div class="image-blogpost">
                    <img src="${blogPost._embedded["wp:featuredmedia"][0].source_url}" alt="${blogPost._embedded["wp:featuredmedia"][0].alt_text}">
                    </div>
                    </div>
                
                <div class="blog-text">
                    <h2>${blogPost.title.rendered}</h2>
                    <p>Published by: ${blogPost._embedded.author[0].name}</p>
                    <p>${blogPost.excerpt.rendered}</p>
                    <p class="read-more-post-btn">Read more</p>
                </div>
            </div>
            </a>
                `;
       
          
        })
        });
    
    
    /*
     radioBtns.forEach (function (filterBtn) {
       filterBtn.addEventListener("change", function () {
          for (let i = 0; i < filterBtn.length; i++) {
            filterBtn[i].classList.remove("checked");
         }
         this.classList.add("checked");
         
          let blogBox = this.getAttribute("value");
         console.log(blogBox);
         
          if (blogBox === "All") {
            console.log(posts);
          }

          if (blogBox === "Transport") {
            console.log(transport);
          }

          if (blogBox === "Architecture") {
            console.log(architecture);
          }

          if (blogBox === "Urban Design") {
            console.log(urbanDesign);
          }

          if (blogBox === "City Planning") {
            console.log(cityPlanning);
          }
        });
      });

    
    
*/
    /**************** ALL POSTS **********************/
      allPosts.innerHTML = "";
      posts.forEach(function (blogPost) {
        allPosts.innerHTML += `
            <a href= /post.html?id=${blogPost.id}>
            <div class="blog-post">
            <div class="blog-image">
            <div class="category-label">${blogPost._embedded["wp:term"][0][0].name}</div>
            <div class="image-blogpost">
                <img src="${blogPost._embedded["wp:featuredmedia"][0].source_url}" alt="${blogPost._embedded["wp:featuredmedia"][0].alt_text}">
                </div>
                </div>
            
            <div class="blog-text">
                <h2>${blogPost.title.rendered}</h2>
                <p>Published by: ${blogPost._embedded.author[0].name}</p>
                <p>${blogPost.excerpt.rendered}</p>
                <p class="read-more-post-btn">Read more</p>
            </div>
        </div>
        </a>
            `;
      
      });


    /************************LOAD MORE POSTS**************************/
    let loadMoreBtn = document.querySelector(".view-more-btn");
    let currentAmount = 10;

    loadMoreBtn.onclick = () => {
      let boxes = document.querySelectorAll(".all-posts a");

      for (let i = currentAmount; i < currentAmount + 3; i++) {
        boxes[i].style.display = "flex";
      }
      currentAmount += 3;
      if (currentAmount >= boxes.length) {
        loadMoreBtn.style.display = "none";
      }
    };

   
    

  } catch (error) {}
}

fetchPosts();
