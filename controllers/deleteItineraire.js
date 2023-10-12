import query from '../database.js';
import fs from 'fs';


/****SUPPRESSION DE CONTACT */
export default (req, res) => {
    let id = req.params.id;

    query(
        `DELETE FROM itineraire WHERE id =?`,
        [id],
        (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).send('Erreur lors de la requete');
                return;
            }
            
            //  !!!!!!!!!!! on redirige vers la page liste qui n'est pas encore créée !!!!!!!!!
            res.redirect(`detailAdmin`);
        }
    )
}
