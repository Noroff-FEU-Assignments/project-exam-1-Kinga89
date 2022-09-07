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

        const filteredPosts = posts.filter(post => post._embedded['wp:term'][0][0].name === "Transport");
        console.log(filteredPosts)
        
        const radioBtns = document.querySelectorAll("input[name='filtered-posts']");
        const searchButton = document.querySelector(".search-button");
        
        allPosts.innerHTML = "";

        let selectedCategory = () => {
            let selected = document.querySelector("input[name='filtered-posts']:checked").id;
            console.log(selected)
        }

        searchButton.addEventListener("click", selectedCategory);

        selectedCategory();
        
        posts.forEach(function (blogPost) {
            allPosts.innerHTML += `
            <a href= /post.html?id=${blogPost.id}>
            <div class="blog-post">
            <div class="blog-image">
            <div class="category-label">${blogPost._embedded['wp:term'][0][0].name}</div>
            <div class="image-blogpost">
                <img src="${blogPost._embedded['wp:featuredmedia'][0].source_url}" alt="${blogPost._embedded['wp:featuredmedia'][0].alt_text}">
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
            `


        } 
            )


    } catch (error) {
        
    }

};

fetchPosts();