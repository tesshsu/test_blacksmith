//Importation jwt
const jwt = require('jsonwebtoken');

//Importation de dotenv
const dotenv = require('dotenv');
dotenv.config();

//Exportation du middleware
module.exports = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.TOKEN);
      const userId = decodedToken.userId;
      if (req.body.userId && req.body.userId !== userId) {
        throw 'User ID non valable';
      } else {
        next();
      }
    } catch {
      res.status(401).json({ error: new Error('Requête non authentifiée!')});
   }
};