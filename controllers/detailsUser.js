import query from '../database.js';

/****DETAIL DU USER */
export default (req, res) => {
    const id = req.params.id;

    query(
        `SELECT * FROM User WHERE id= ?`, [id],
        (error, result) => {
            if (error) {
                console.error(`Erreur lors de l'exécution de la requête ${error}`);
                res.status(500).send(`Erreur serveur`);
                return;
            }
            if (result.length === 0) {
                res.status(404).send(`The user with id ${id} is not found`);
                return;
            }
            const User = result[0];

            if (!User) {
                return res.status(404).send(`User with id ${id} not found`);
            }

            res.render('detailsUser', { User });
        }
    )
}
