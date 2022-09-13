const addMorePosts = "&per_page=15";

const baseURL =
  "http://localhost:8383/wp-json/wp/v2/posts?_embed" + addMorePosts;

const sliderContainer = document.querySelector(".slider-container");

async function fetchPosts() {
  try {
    const response = await fetch(baseURL);
    const posts = await response.json();
    console.log(posts);

    sliderContainer.innerHTML = "";

    /**************** ALL POSTS **********************/
    posts.forEach(function (blogPost) {
      sliderContainer.innerHTML += `
             <div class=slider-carousel>
            <div class="slide">   
            <a href= /post.html?id=${blogPost.id}>
                <div class="card-image">
                <img src="${blogPost._embedded["wp:featuredmedia"][0].source_url}" alt="${blogPost._embedded["wp:featuredmedia"][0].alt_text}">
                </div>
                <div class="card-text">
                <h3>${blogPost.title.rendered}</h3>
                <p>${blogPost.date}</p>
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
