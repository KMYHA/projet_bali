import express from "express";
import query from './database.js'
const router = express.Router();


import listItineraire from "./controllers/listItineraire.js";
import { loginForm, login } from './controllers/login.js';
import { addItineraire, addItineraireSubmit } from './controllers/createItineraire.js';
import detailsItineraire from './controllers/detailsItineraire.js';
import { updateItineraire, updateItineraireSubmit } from "./controllers/updateItineraire.js";
import deleteItineraire from './controllers/deleteItineraire.js';
import adminItineraire from './controllers/adminItineraire.js';
import aPropos from './controllers/aPropos.js';
// import comment from './controllers/comment.js';
import { addUser, addUserSubmit } from './controllers/createUser.js';
import deleteUser from './controllers/deleteUser.js';
import adminUser from './controllers/adminUser.js';
import detailsUser from './controllers/detailsUser.js';


const checkAuthentification = (req, res, next) => {
    if (!req.session.isAdmin) {
        res.redirect('/login');
        return;
    }
    next();
}

router.use((req, res, next) => {
    res.locals.isLogged = req.session.isLogged;
    next();
});

router.use((req, res, next) => {
    query('SELECT * FROM itineraire', [], (error, itineraires) => {
        if (error) {
            console.error(`Erreur lors de l'exécution de la requête ${error}`);
            res.status(500).send('Erreur serveur');
            return;
        }
        res.locals.itineraires = itineraires;
        next(

        );
    });
});

router.get('/', listItineraire);
router.get('/itineraire/add', checkAuthentification, addItineraire);
router.post('/itineraire/add', checkAuthentification, addItineraireSubmit);
router.get('/itineraire/:id', detailsItineraire);
router.get('/itineraire/:id/update', checkAuthentification, updateItineraire)
router.post('/itineraire/:id/update', checkAuthentification, updateItineraireSubmit);
router.get('/itineraire/:id/delete', checkAuthentification, deleteItineraire);
router.get('/aPropos', aPropos)
// router.get('/comment', comment)
router.get('/admin/itineraire', checkAuthentification, adminItineraire)
router.get('/admin/user', checkAuthentification, adminUser)
router.get('/addUser', addUser)
router.post('/addUser', addUserSubmit);
router.get('/login', loginForm);
router.post('/login', login);
router.get('/user/:id', detailsUser);
router.get('/user/:id/delete', checkAuthentification, deleteUser);

export default router;
