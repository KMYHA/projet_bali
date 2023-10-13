import { v4 } from 'uuid';
import query from '../database.js';
import bcrypt from 'bcrypt';

export function addCommentSubmit(req, res) {

                    query(
                        `INSERT INTO Commentaire (id, pseudo, email, message, date de creation) VALUES (?, ?, ?, ?, ?)`, [v4(), email],
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

export function addComment(req, res) {
    res.render(`commentForm`)
};
