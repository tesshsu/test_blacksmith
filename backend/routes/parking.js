//Importation d'express
const express = require('express');

//Création d'un routeur
const router = express.Router();

//Importation du controller
const ParkingCtrl = require('../controllers/parking');

//Importation de l'authentification
const auth = require('../middleware/auth');

//Importation de multer
const multer = require('../middleware/multer');

//CRUD
router.post('/', auth, multer, ParkingCtrl.createParking);
router.put('/:id', auth, multer, ParkingCtrl.modifyParking);
router.delete('/:id', auth, ParkingCtrl.deleteParking);
router.get('/:id', auth, ParkingCtrl.getOneParking);
router.get('/', auth, ParkingCtrl.getAllParkings);

//Exportation du routeur
module.exports = router;
