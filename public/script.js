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
let intervalId;

function enleverActiveImg() {
    for (let i = 0; i < img_slider.length; i++) {
        img_slider[i].classList.remove('active');
    }
}

function stopSlider() {
    clearInterval(intervalId);
}

function startSlider() {
    intervalId = setInterval(function() {
        step++;
        if (step >= img_slider.length) {
            step = 0
        }
        enleverActiveImg();
        img_slider[step].classList.add('active')
    }, 3000)
}
if (img_slider.length>0){
    startSlider()
}




/******** POP-UP ********/

// const openPopup=document.getElementById('open_pop_up');
// const popup=document.getElementById('js-pop-up-form');

// openPopup.addEventListener("click", () => {
//     popup.classList.toggle('js-pop-up');
// })
