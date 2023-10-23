document.addEventListener("DOMContentLoaded", function() {

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
if (img_slider.length > 0) {
    startSlider()
}




/******** POP-UP ********/

let modalAlreadyShowed = false;
const openPopup=document.getElementById('popup')
const closePopup=document.getElementById('btn_close')

window.addEventListener('scroll',()=> {
  if( ! modalAlreadyShowed ) {
    setTimeout( () => {
      openPopup.style.display = 'block'
    }, 2000 )
    modalAlreadyShowed = true
  }
});

closePopup.addEventListener('click',() =>{
  openPopup.style.display = 'none'
})

/******** FETCH ********/
const deleteBtnList = document.querySelectorAll('.delete_btn');


deleteBtnList.forEach((deleteBtn) => {
    deleteBtn.addEventListener('click', (event) => {
        const isAsked = event.target.dataset.asked;

        if (!isAsked) {
            event.target.dataset.asked = true;
            event.target.style.backgroundColor = 'red';
            event.target.innerText = 'Cliquez pour confirmer';

        }
        else {

            // Le bouton est confirmé, procédez à la suppression

            const itineraireId = event.target.dataset.itineraireid;

            // Effectuez le fetch pour supprimer l'itinéraire
            fetch(`http://camillehallereau.ide.3wa.io:9001/itineraire/${itineraireId}/delete`, {
                    method: 'GET'
                })
                .then(response => {
                    if (response.ok) {
                        // Le serveur a répondu avec succès, vous pouvez mettre en œuvre des actions supplémentaires si nécessaire.
                        console.log(`Itinéraire ${itineraireId} a été supprimé avec succès.`);
                        event.target.closest('.itineraire').remove(); // Supprimer l'élément du DOM
                    }
                    else {
                        console.error(`Erreur lors de la suppression de l'itinéraire ${itineraireId}.`);
                    }
                })
                .catch(error => {
                    console.error(`Erreur de réseau : ${error}`);
                });
        }

    });

})
})