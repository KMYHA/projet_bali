const icons = document.getElementById('icons');
const nav = document.querySelector('.active');

icons.addEventListener("click",()=>{
    nav.classList.toggle("active")
})