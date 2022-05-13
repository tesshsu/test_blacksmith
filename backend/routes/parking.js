//Importation d'express
const express = require('express');

//Création d'un routeur
const router = express.Router();

//Importation du controller
const parkingCtrl = require('../controllers/parking');

//Importation de l'authentification
const auth = require('../middleware/auth');

//Importation de multer
const multer = require('../middleware/multer');

//CRUD
router.post('/', auth, multer, parkingCtrl.createParking); 
router.put('/:id', auth, multer, parkingCtrl.modifyParking); 
router.delete('/:id', auth, parkingCtrl.deleteParking);
router.get('/:id', auth, parkingCtrl.getOneParking); 
router.get('/', auth, parkingCtrl.getAllParkings);

//Exportation du routeur
module.exports = router;