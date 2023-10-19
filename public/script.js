const icons = document.getElementById('icons');
const nav = document.getElementById('nav');
const links=document.querySelectorAll('nav li');

nav.classList.remove("active")

icons.addEventListener("click",()=>{
    nav.classList.toggle("active")
})

links.forEach((link)=>{
    link.addEventListener('click',()=>{
        nav.classList.remove("active")
    })
})