export function goBack() {
    window.history.back()
}; 

const hamburgerOpen = document.querySelector(".fa-bars");
const hamburgerClose = document.querySelector(".fa-times");
const navMobile = document.querySelector("nav ul");
const meny = document.querySelector(".nav-container p");


 export function hamburgerMenuOpen () {
     navMobile.style.display = "flex";
     hamburgerClose.style.display = "inline-block";
     hamburgerOpen.style.display = "none";
     meny.style.display = "none";
};

export function hamburgerMenuClose () {
    navMobile.style.display = "none";
    hamburgerClose.style.display = "none";
    hamburgerOpen.style.display = "inline-block";
    meny.style.display = "inline";
};