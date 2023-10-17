import { v4 } from 'uuid';
import query from '../database.js';
import xss from 'xss'


export function addNewsletterSubmit (req, res) {
    const email = req.body.email;
    const idItineraire = req.body.id_itineraire;

    query(
        `INSERT INTO Newsletter (id, email, id_itineraire) VALUES (?, ?, ?)`,
        [v4(), xss(email), idItineraire],
        (error, result) => {
            if (error) {
                res.status(500).send("Erreur lors de l'ajout du mail");
                return;
            }
            res.redirect(`/itineraire/${idItineraire}`);
        }
    );
}

export function addNewsletter(req, res) {
    res.render(`detailsItineraire`)
};
