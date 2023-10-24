import query from '../database.js';
import xss from 'xss';

/***AFFICHER LE FORMULAIRE DE MODIFICATION */
export function updateItineraire(req, res) {
    let id = req.params.id;

    query(
        'SELECT * FROM itineraire WHERE id = ?', [id],
        (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).send('Erreur lors de la requete');
                return;
            }

            const itineraire = results[0];

            if (!itineraire) {
                return res.status(404).send(`Contact with id ${id} not found`);
            }

            //on appelle le template updateFormItineraire en lui passant les informations concernant le contact
            res.render('updateFormItineraire', {
                title: 'Modification d\'un itinéraire',
                action: `/itineraire/${id}/update`,
                itineraire
            });
        }
    );
};

export function updateItineraireSubmit(req, res) {
    console.log(req.body);

    let id = req.params.id;
    query(`UPDATE itineraire SET               
            plan = ?,
            texte_1 = ?,
            texte_2 = ?,
            texte_3 = ?,
            titre_1 = ?,
            titre_2 = ?,
            titre_3 = ?,
            titre_4 = ?
        
            
        WHERE id = ?`, [
            xss(req.body.plan),
            xss(req.body.texte_1),
            xss(req.body.texte_2),
            xss(req.body.texte_3),
            xss(req.body.titre_1),
            xss(req.body.titre_2),
            xss(req.body.titre_3),
            xss(req.body.titre_4),
            id

        ],
        (error, result) => {
            if (error) {
                console.error(error);
                res.status(500).send('Erreur lors de la requete');
                return;
            }
            res.redirect('/admin/itineraire');
        }
    );
}
