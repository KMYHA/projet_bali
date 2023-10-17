import { v4 } from 'uuid';
import query from '../database.js';
import xss from 'xss'

export function addCommentSubmit (req, res) {

  const pseudo=req.body.pseudo;
  const message=req.body.message;


  query(
    `INSERT INTO Commentaire (id, pseudo, message, id_user) VALUES (?, ?, ?, ?)`,
    [v4(), xss(pseudo), xss(message),req.session.idUser],
    (error, result) => {
      if (error) {
        res.status(500).send("Erreur lors de l'ajout du nouveau commentaire");
        return;
      } 
        res.redirect('/comment');
    }
  );
}

export function addComment(req, res) {
  query(
    'SELECT *, DATE_FORMAT(date_de_creation, "%Y-%m-%d %H:%i:%s") AS dateFormatee FROM Commentaire',
    [],
    (error, result) => {
      if (error) {
        res.status(500).send("Erreur lors de la récupération des commentaires");
        return;
      } 
        const commentaires = result;
        res.render('commentForm', { commentaires });
    }
  );
}