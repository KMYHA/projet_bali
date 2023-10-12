import express from "express";
import query from './database.js'
const router = express.Router();


import listItineraire from "./controllers/listItineraire.js";
import {addItineraire,addItineraireSubmit} from './controllers/createItineraire.js';
import Itineraire from './controllers/Itineraire.js';
import {updateItineraire, updateItineraireSubmit} from "./controllers/updateItineraire.js";
import deleteItineraire from './controllers/deleteItineraire.js';
import {addUser, addUserSubmit} from './controllers/createUser.js';
import {loginForm, login} from './controllers/login.js';
import aPropos from'./controllers/aPropos.js';
import comment from'./controllers/comment.js';

router.use((req, res, next) => {
    res.locals.isLogged = req.session.isLogged;
    next();
});

router.use((req,res,next)=>{
    query('SELECT * FROM itineraire', [], (error, itineraires) => {
    if (error) {
        console.error(`Erreur lors de l'exécution de la requête ${error}`);
        res.status(500).send('Erreur serveur');
        return;
    }
        res.locals.itineraires=itineraires;
        next();
    });
});

router.get('/', listItineraire);
router.get('/itineraire/add', addItineraire);
router.post('/itineraire/add', addItineraireSubmit);
router.get('/itineraire/:id', Itineraire);
router.get('/itineraire/:id/update',updateItineraire)
router.post('/contacts/:id/update', updateItineraireSubmit);
router.get('/itineraire/:id/delete', deleteItineraire);
router.get('/aPropos',aPropos)
router.get('/comment',comment)
router.get('/addUser',addUser)
router.post('/addUser', addUserSubmit);
router.get('/login', loginForm);
router.post('/login', login);

export default router;