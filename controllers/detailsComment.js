import query from '../database.js';

/****DETAIL DES COMMENTAIRES */
export default (req, res) => {
    const id = req.params.id;

    query(
        `SELECT * FROM Commentaire WHERE id= ?`, [id],
        (error, result) => {
            if (error) {
                console.error(`Erreur lors de l'exécution de la requête ${error}`);
                res.status(500).send(`Erreur serveur`);
                return;
            }
            if (result.length === 0) {
                res.status(404).send(`The comment with id ${id} is not found`);
                return;
            }
            const Commentaires = result[0];

            if (!Commentaires) {
                return res.status(404).send(`Comment with id ${id} not found`);
            }

            res.render('commentForm', { Commentaires });
        }
    )
}
