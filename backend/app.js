//Importation d'Express
const express = require('express');

//Importation d'helmet
const helmet = require('helmet');

//Importation de dotenv pour les variables d'environnement
const dotenv = require('dotenv');
dotenv.config();

//Importation path
const path = require('path');

//Importation des routes
const ParkingRoutes = require('./routes/Parking');
const userRoutes = require('./routes/user');

//Création d'une application express
const app = express();

//Appel d'helmet
app.use(helmet());

//Importation de Mongoose
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


//Middleware pour résoudre les problemes de CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//Middleware pour avoir accès au corps de la requete
app.use(express.json());

//Configuration du middleware pour permettre l'accès aux images
app.use('/images', express.static(path.join(__dirname, 'images')));

//Enregistrement des routes
app.use('/api/auth', userRoutes);
app.use('/api/Parkings', ParkingRoutes);

//Exportation de cette application
module.exports = app;
