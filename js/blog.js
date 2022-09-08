import { goBack } from "./utils.js";
const previousPage = document.querySelector(".fa-arrow-left");
previousPage.addEventListener("click", goBack);

const addMorePosts = "&per_page=15";
const baseURL = "http://localhost:8383/wp-json/wp/v2/posts?_embed";

const allPosts = document.querySelector(".all-posts");

async function fetchPosts() {
  try {
    const response = await fetch(baseURL);
    const posts = await response.json();
      console.log(posts);
      
      allPosts.innerHTML = "";



    /**************** ALL POSTS **********************/
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
                <p>${blogPost.date}</p>
                <p>${blogPost.excerpt.rendered}</p>
                <p class="read-more-post-btn">Read more</p>
            </div>
        </div>
        </a>
            `;     
    });
    
      /************************LOAD MORE POSTS**************************/
      const loadMoreBtn = document.querySelector(".view-more-btn");
        let currentAmount = 10;
        
        loadMoreBtn.onclick = () => {
        let morePosts = [...document.querySelectorAll(".all-posts a .blog-posts")];  
          for (let i = currentAmount; i > currentAmount +2; i++) {
          morePosts[i].style.display = "block";
        }
            currentAmount += 10;
      };
      

    /************** RADIO BUTTONS ****************/
    const radioBtns = document.querySelectorAll("input[name='filtered-posts']");
    let input = document.querySelectorAll("input");
    const form = document.queryCommandIndeterm(".filter-posts");

    const all = posts.filter(
      (post) => post._embedded["wp:term"][0][0].name === "All"
    );
    const transport = posts.filter(
      (post) => post._embedded["wp:term"][0][0].name === "Transport"
    );
    const urbanDesign = posts.filter(
      (post) => post._embedded["wp:term"][0][0].name === "Urban Design"
    );
    const architecture = posts.filter(
      (post) => post._embedded["wp:term"][0][0].name === "Architecture"
    );
    const cityPlanning = posts.filter(
      (post) => post._embedded["wp:term"][0][0].name === "City Planning"
    );

    for (let i = 0; i < input.length; i++) {
      input[i].addEventListener("click", function () {
        for (let j = 0; j < input.length; j++) {
          input[j].classList.remove("checked");
        }
        this.classList.add("checked");
        let blogBox = this.getAttribute("value");

        if (blogBox === "Transport") {
          transport.forEach(function (trans) {
            allPosts.innerHTML += `
                           <a href= /post.html?id=${trans.id}>
                           <div class="blog-post">
                           <div class="blog-image">
                           <div class="category-label">${trans._embedded["wp:term"][0][0].name}</div>
                           <div class="image-blogpost">
                               <img src="${trans._embedded["wp:featuredmedia"][0].source_url}" alt="${trans._embedded["wp:featuredmedia"][0].alt_text}">
                               </div>
                               </div>
                           
                           <div class="blog-text">
                               <h2>${trans.title.rendered}</h2>
                               <p>${trans.date}</p>
                               <p>${trans.excerpt.rendered}</p>
                               <p class="read-more-post-btn">Read more</p>
                           </div>
                       </div>
                       </a>
                           `;
          });
        }
        if (blogBox === "Urban Design") {
          allPosts.innerHTML = `${urbanDesign}`;
        }

        if (blogBox === "Architecture") {
          allPosts.innerHTML = `${architecture}`;
        }
        if (blogBox === "City Planning") {
          allPosts.innerHTML = `${cityPlanning}`;
        }
      });
    }
  } catch (error) {}
}

fetchPosts();
