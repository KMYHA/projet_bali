//librairie qui permet de gérer mon fichier .env 
import dotenv from 'dotenv'
dotenv.config()

//Appel des dépendances

//framework qui permet de gérer les routes
import express from 'express';
//session permet de gérer les sessions
import session from'express-session';
import router from './router.js';

//configuration de la gestion des sessions
const PORT = process.env.PORT;
const app = express();
app.use(session({
	secret: 'd1249acc-1eaa-48ab-8034-16d84a3ab40f',
	resave: false,
	saveUninitialized: true,
	cookie: {maxAge: 3600000}
}));

//pour récupérer les informations du formulaire
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) 

//fichiers statiques
app.use(express.static('public'));

//spécifie le dossier qui contient les vues
app.set('views', './views'); 

// indique à Express.js d'utiliser.ejs pour afficher des vues dynamiques 
app.set('view engine', 'ejs'); 

//importation des routes
app.use('/', router);

// connexion du serveur au réseau
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
