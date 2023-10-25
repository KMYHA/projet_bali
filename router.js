import express from "express";
import query from './database.js'
const router = express.Router();

import homeController from'./controllers/homeController.js';
import listItineraire from './controllers/listItineraire.js';
import { loginForm, login } from './controllers/login.js';
import { addItineraire, addItineraireSubmit } from './controllers/createItineraire.js';
import detailsItineraire from './controllers/detailsItineraire.js';
import { updateItineraire, updateItineraireSubmit } from "./controllers/updateItineraire.js";
import deleteItineraire from './controllers/deleteItineraire.js';
import adminItineraire from './controllers/adminItineraire.js';
import aPropos from './controllers/aPropos.js';
import {addComment,addCommentSubmit} from './controllers/createComment.js';
import { addUser, addUserSubmit } from './controllers/createUser.js';
import adminComment from './controllers/adminComment.js';
import deleteComment from './controllers/deleteComment.js'
import deleteUser from './controllers/deleteUser.js';
import adminUser from './controllers/adminUser.js';
import detailsUser from './controllers/detailsUser.js';
import {addNewsletter,addNewsletterSubmit} from './controllers/createNewsletter.js'
import logout from './controllers/logout.js';
import legal from'./controllers/legal.js';


const checkAuthentification = (req, res, next) => {
    if (!req.session.isAdmin) {
        res.redirect('/login');
        return;
    }
    next();
}

const checkAuthentificationUser = (req, res, next) => {
    if (!req.session.isUser) { 
        res.redirect('/login'); 
        return;
    }
    next();
};


router.use((req, res, next) => {
    res.locals.isLogged = req.session.isLogged;
    res.locals.pseudo=req.session.pseudo;
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

router.get('/home', homeController);
router.get('/itineraires', listItineraire);
router.get('/itineraire/add', checkAuthentification, addItineraire);
router.post('/itineraire/add', checkAuthentification, addItineraireSubmit);
router.get('/itineraire/:id', detailsItineraire);
router.get('/itineraire/:id/newsletter', addNewsletter);
router.post('/itineraire/:id/newsletter', addNewsletterSubmit);
router.get('/itineraire/:id/update', checkAuthentification, updateItineraire)
router.post('/itineraire/:id/update', checkAuthentification, updateItineraireSubmit);
router.get('/itineraire/:id/delete', checkAuthentification, deleteItineraire);
router.get('/aPropos', aPropos);
router.get('/comment',addComment);
router.post('/comment',checkAuthentificationUser, addCommentSubmit);
router.get('/admin/comment', checkAuthentification, adminComment);
router.get('/comment/:id/delete', checkAuthentification, deleteComment);
router.get('/admin/itineraire', checkAuthentification, adminItineraire);
router.get('/admin/user', checkAuthentification, adminUser);
router.get('/addUser', addUser);
router.post('/addUser', addUserSubmit);
router.get('/login', loginForm);
router.post('/login', login);
router.get('/logout', logout);
router.get('/user/:id', detailsUser);
router.get('/user/:id/delete', checkAuthentification, deleteUser);
router.get('/legal',legal)


export default router;
