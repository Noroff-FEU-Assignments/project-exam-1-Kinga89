import { goBack } from "./utils.js";
const previousPage = document.querySelector(".fa-arrow-left");
previousPage.addEventListener("click", goBack);

const addMorePosts = "&per_page=15";
const baseURL =
  "http://localhost:8383/wp-json/wp/v2/posts?_embed" + addMorePosts;

const allPosts = document.querySelector(".all-posts");

async function fetchPosts() {
  try {
    const response = await fetch(baseURL);
    const posts = await response.json();
    console.log(posts);

    /************** RADIO BUTTONS ****************/
    const radioBtns = document.querySelectorAll("#radio-button");
    const allBlogPosts = document.querySelectorAll(".blog-post");

   

    /*

 for (let i = 0; i < radioBtns.length; i++){
   radioBtns[i].addEventListener("change", (element) => {
     element.preventDefault();
   
     const filterNew = element.target.dataset.filter;
     console.log (filterNew)

     allBlogPosts.forEach((post) => {
       if (filterNew === "transport") {
         post.style.display = "flex";
       } else {
         if (post.classList.contains(filter)) {
          post.style.display = "flex";
         } else {
          post.style.display = "none";
         }
      }
       
     })
   
   })

 }*/

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
                <p>${blogPost.date}</p>
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

    /*-------------------------FILTER--------------------------*/

    const all = posts;

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
  
    
     radioBtns.forEach (function (filterBtn) {
       filterBtn.addEventListener("change", function () {
          for (let j = 0; j < filterBtn.length; j++) {
            filterBtn[j].classList.remove("checked");
          }
          this.classList.add("checked");
          let blogBox = this.getAttribute("value");
          console.log(blogBox);

          if (blogBox === "All") {
            console.log(all);
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

    

  } catch (error) {}
}

fetchPosts();
