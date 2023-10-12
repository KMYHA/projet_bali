import query from '../database.js';
import bcrypt from 'bcrypt';


export function loginForm(req, res) {
    res.render('formLogin', { message: null });
};

export function login(req, res) {
    const { pseudo, password } = req.body;
    // Récupération du User par son pseudo
    query(
        'SELECT * FROM User WHERE pseudo = ?', [pseudo],
        (error, user) => {
            // Gestion de l'erreur
            if (error) {
                console.error(`Erreur lors l'exécution de la requête : ${error}`);
                res.status(500).send('Erreur serveur');
                return;
            }

            // Si l'utilisateur n'a pas été trouvé
            if (user.length === 0) {
                const message = 'Identifiants incorrects';
                res.render('formLogin', { message });
                return;
            }
            // Vérification du mot de passe
            bcrypt.compare(password, user[0].password, (error, result) => {
                if (!result) {
                    res.render(
                        'formLogin', { message: 'Identifiants incorrects' }
                    );
                    return;
                }
                if (user[0].role === 'admin') {
                    // Utilisateur est un administrateur
                    req.session.isLogged = true;
                    req.session.isAdmin = true; // Stockez l'information d'administrateur dans la session
                    res.redirect('/admin/itineraire'); //
                }
                else {

                    req.session.isLogged = true;
                    res.redirect('/');
                }
            });
        }
    );
}