import { v4 } from 'uuid';
import query from '../database.js';
import formidable from 'formidable';
import fs from 'fs';

// Export du contrôleur
export function addItineraireSubmit (req, res) {
    const formData = formidable();

    // Récupération des champs et des fichiers
    formData.parse(req, (error, fields, files) => {
        console.log(files)
        if (error) {
            console.error(`Erreur lors de la récupération de la photo`);
            res.status(500).send('Erreur serveur');
            return;
        }

        const promises = [];

        if (files.images.length < 3) {
            //todo : envoyer message et rediriger vers le formulaire. Code suivant à supp:
            res.status(500).send('Erreur serveur');
            return;
        }

        for (let i = 0; i <= 2; i++) {
            const image = files.images[i];

            // Récupération du chemin temporaire du fichier
            let oldPath = image.filepath;
            // Chemin vers où sera stocké le fichier
            let newPath = 'public/image/' + image.originalFilename;
            // Récupération du nom du fichier pour le stocker en BDD
            let imageName = image.originalFilename;

            const promise = new Promise((resolve, rejected) => {
                fs.copyFile(oldPath, newPath, (error) => {
                    if (error) {
                        console.error(`Erreur lors de la récupération de la photo`);
                        rejected(error);
                        return;
                    }
                    resolve(imageName);
                });
            });

            promises.push(promise);
        }
        // Copie le fichier depuis le dossier temporaire vers le dossier de destination
        Promise.all(promises).then((imageNames) => {
            // Insertion du kitten dans la BDD
            query(
                `INSERT INTO itineraire(id,image_1, image_2, image_3,plan,texte_1,texte_2,texte_3,texte_4, titre_1,titre_2,titre_3,titre_4,titre_5) VALUES (?, ?, ?, ?, ?,?,?,?,?,?,?,?,?,?)`, [v4(),imageNames[0], imageNames[1], imageNames[2],fields.plan, fields.texte_1, fields.texte_2, fields.texte_3, fields.texte_4, fields.titre_1,fields.titre_2,fields.titre_3,fields.titre_4,fields.titre_5],
                (error, results) => {
                    if (error) {
                        console.error(`Erreur lors de l'exécution de la requête ${error}`);
                        res.status(500).send('Erreur serveur');
                        return;
                    }
                    res.send('itinéraire ajouté');
                }
            );
        }).catch((error) => {
            res.status(500).send('Erreur serveur');
            return;
        });

    });
};

export function addItineraire (req, res) {
  res.render('addForm.ejs');
};
