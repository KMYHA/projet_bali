import query from '../database.js'

export default (req, res) => {
  query('SELECT * FROM itineraire', [], (error, itineraires) => {
    if (error) {
      console.error(`Erreur lors de l'exécution de la requête ${error}`);
      res.status(500).send('Erreur serveur');
      return;
    }
    res.render('home', { itineraires });
  });
};
