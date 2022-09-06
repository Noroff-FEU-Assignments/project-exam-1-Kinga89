import { goBack } from "./utils.js";
const previousPage = document.querySelector(".fa-arrow-left");
previousPage.addEventListener("click", goBack);


const allPosts = document.querySelector(".all-posts");

const baseURL = "http://localhost:8383/wp-json/wp/v2/posts?_embed";

async function fetchPosts() {
    try {
        const response = await fetch(baseURL);
        const posts = await response.json();
        console.log(posts)
        
        posts.forEach(function (blogPost) {
            allPosts.innerHTML += `
            <a href= /post.html?id=${blogPost.id}>
            <div class="blog-post">
            <div class="blog-image">
                <img src="${blogPost._embedded['wp:featuredmedia'][0].source_url}" alt="">
            </div>
            
            <div class="blog-text">
                <h2>${blogPost.title.rendered}</h2>
                <p>${blogPost.date}</p>
                <p>${blogPost.excerpt.rendered}</p>
                <p class="read-more-post-btn">Read more</p>
            </div>
        </div>
        </a>
            `


        } 
            )


    } catch (error) {
        
    }

};

fetchPosts();