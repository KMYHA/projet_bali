import { v4 } from 'uuid';
import query from '../database.js';
import bcrypt from 'bcrypt';

export function addUserSubmit(req, res) {
    const email = req.body.email;
    const pseudo = req.body.pseudo;

    // Vérification de l'existence du pseudo
    query('SELECT * FROM User WHERE pseudo = ? OR email = ?', [pseudo, email], (error, result) => {
        if (error) {
            res.status(500).send("Erreur lors de la vérification du pseudo");
            return;
        }
        if (result.length === 0) {
            // Aucun résultat similaire trouvé pour le pseudo

            // ce code crypte le mdp :
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    res.status(500).send("Erreur lors de la création du hachage du mot de passe");
                    return;
                }

                query(
                    `INSERT INTO User (id, email, pseudo, password, role) VALUES (?, ?, ?, ?, ?)`, [v4(), email, pseudo, hash, 'User'],
                    (error, result) => {
                        if (error) {
                            res.status(500).send("Erreur lors de l'ajout du nouvel utilisateur");
                            return;
                        }
                        res.redirect(`/`);
                    }
                );
            });
        }
        else {
            res.status(400).send("Ce pseudo ou cet email sont déjà utilisé.");
            return;
        };
    });
};

export function addUser(req, res) {
    res.render(`formUser`)
};
