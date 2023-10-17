import query from '../database.js';
import fs from 'fs';


/****SUPPRESSION DES COMMENTAIRES */
export default (req, res) => {
    let id = req.params.id;

    query(
        `DELETE FROM Commentaire WHERE id =?`, [id],
        (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).send('Erreur lors de la requete');
                return;
            }

            res.redirect(`/admin/comment`);
        }
    )
}
