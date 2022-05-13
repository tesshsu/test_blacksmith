//Importation d'express
const express = require('express');

//Création d'un routeur
const router = express.Router();

//Importation du controller
const parkingCtrl = require('../controllers/parking');

//Importation de l'authentification
const auth = require('../middleware/auth');

//CRUD
router.post('/', auth, parkingCtrl.createParking); 
router.put('/:id', auth, parkingCtrl.updateParking); 
router.delete('/:id', auth, parkingCtrl.deleteParking);
router.get('/:id', auth, parkingCtrl.getOneParking); 
router.get('/', auth, parkingCtrl.getAllParkings);
router.post('/:id', auth, parkingCtrl.assginParkingtoUser);

//Exportation du routeur
module.exports = router;