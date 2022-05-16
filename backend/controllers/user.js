//Importation de bcrypt
const bcrypt = require('bcrypt');

//Importation de jsonwebtoken
const jwt = require('jsonwebtoken');

//Importation de dotenv
const dotenv = require('dotenv');
dotenv.config();

//Importation du model user
const User = require('../models/user');


//L'utilisateur crée un compte
// Créer un compte utilisateur
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

//L'utilisateur se connecte à un compte existant
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              process.env.TOKEN,
              { expiresIn: '24h' })
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

//Affichage des users
exports.getAllUsers = (req, res, next) => {
  User.find().sort({ field: 'asc', test: -1 })
    .then(users => res.status(200).json(users))
    .catch(error => res.status(400).json({ error }));
};
