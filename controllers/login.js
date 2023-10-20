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
                req.session.isLogged = true; 
                //stockage de l'id User
                req.session.idUser = user[0].id;
                req.session.pseudo = user[0].pseudo;
                
                if (user[0].role === 'admin') {
                    // Utilisateur est un administrateur
                    req.session.isAdmin = true; // Stockage de l'administrateur dans la session
                    res.redirect('/admin/itineraire'); //
                }
                else if (user[0].role === 'User'){
                    req.session.isUser = true;
                    res.redirect('/comment');
                }
            });
        }
    );
}
