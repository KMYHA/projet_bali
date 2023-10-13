import query from '../database.js';
import fs from 'fs';


/****SUPPRESSION DE USER */
export default (req, res) => {
    let id = req.params.id;

    query(
        `DELETE FROM User WHERE id =?`, [id],
        (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).send('Erreur lors de la requete');
                return;
            }

            res.redirect(`/admin/user`);
        }
    )
}
