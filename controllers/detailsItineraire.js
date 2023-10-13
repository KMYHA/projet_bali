import query from '../database.js';

/****DETAIL DE L'ITINERAIRE */
export default (req, res) => {
    const id = req.params.id;

    query(
        `SELECT * FROM itineraire WHERE id= ?`, [id],
        (error, result) => {
            if (error) {
                console.error(`Erreur lors de l'exécution de la requête ${error}`);
                res.status(500).send(`Erreur serveur`);
                return;
            }
            if (result.length === 0) {
                res.status(404).send(`The itinerary with id ${id} is not found`);
                return;
            }
            const itineraire = result[0];

            if (!itineraire) {
                return res.status(404).send(`Itinerary with id ${id} not found`);
            }

            res.render('detailsItineraire', { itineraire });
        }
    )
}
