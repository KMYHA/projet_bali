const icons = document.getElementById('icons');
const nav = document.querySelector('nav ul');
const main_menu = document.getElementById('main_menu')
/******** MENU BURGER ********/

icons.addEventListener("click", () => {
    nav.classList.toggle("js-visibility");
    icons.classList.toggle("js-toggle-icon");
    main_menu.classList.toggle("js-main-menu");
})


/******** SLIDER ********/

const img_slider = document.querySelectorAll(".js-img-slider")
let step = 0;
const next = document.querySelector('.next')
const previous = document.querySelector('.previous')

function enleverActiveImg() {
    for (let i = 0; i < img_slider.length; i++) {
        img_slider[i].classList.remove('active');
    }
}

setInterval(function() {
step++;
if (step >= img_slider.length) {
    step = 0
}
enleverActiveImg();
img_slider[step].classList.add('active')
}, 4000)
