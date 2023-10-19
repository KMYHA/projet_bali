import query from '../database.js';
import fs from 'fs';


/****SUPPRESSION D'UN ITINERAIRE */
export default (req, res) => {
    let id = req.params.id;

    query(
        `SELECT image_1, image_2, image_3 FROM itineraire WHERE id = ?`, [id],
        (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).send('Erreur lors de la requête');
                return;
            }

            if (results.length === 0) {
                res.status(404).send('Itinéraire non trouvé');
                return;
            }

            // Supprimez les fichiers d'image du système de fichiers
            const imagesToDelete = [results[0].image_1, results[0].image_2, results[0].image_3];
            imagesToDelete.forEach((imageName) => {
                const filePath = '/image/' + imageName;
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error(`Erreur lors de la suppression du fichier ${imageName}: ${err}`);
                    }
                });
            });

            // Supprimez l'itinéraire de la base de données
            query(
                'DELETE FROM Newsletter WHERE id_itineraire = ?',
                [id],
                (error) => {
                    if(error) {
                        console.error(error);
                        res.status(500).send('Erreur lors de la requête de suppression');
                        return;
                    }
                    
                    query(
                `DELETE FROM itineraire WHERE id = ?`, [id],
                (deleteError) => {
                    if (deleteError) {
                        console.error(deleteError);
                        res.status(500).send('Erreur lors de la requête de suppression');
                        return;
                    }
                    res.redirect(`/admin/itineraire`);
                }
            );
                }
                )
            
        }
    );
};