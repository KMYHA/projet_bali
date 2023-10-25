import query from '../database.js'

export default (req, res) => {
  query('SELECT * FROM Commentaire ORDER BY date_de_creation DESC', [], (error, Commentaires) => {
    if (error) {
      console.error(`Erreur lors de l'exécution de la requête ${error}`);
      res.status(500).send('Erreur serveur');
      return;
    }
    res.render('listCommentsAdmin', { Commentaires });
  });
};
