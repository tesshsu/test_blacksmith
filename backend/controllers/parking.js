
//Importation du modele
const Parking = require('../models/Parking');

//Importation file system
const fs = require('fs');

//Création d'une Parking
exports.createParking = (req, res, next) => {
    const ParkingObject = JSON.parse(req.body.Parking);
    delete ParkingObject._id;
    const parking = new Parking({
      ...ParkingObject,
    });
    parking.save()
      .then(() => res.status(201).json({ message: 'Parking ajoutée !'}))
      .catch(error => res.status(400).json({ error }));
};

//Modification d'une Parking
exports.modifyParking = (req, res, next) => {
    const parkingObject = req.file ?
    {
      ...JSON.parse(req.body.parking)
    } : { ...req.body };
    Parking.findOne({ _id: req.params.id })
      .then((parking) => {
        if(req.file == null) {
          Parking.updateOne({ _id: req.params.id },
            { ...parkingObject, _id: req.params.id})
            .then(() => res.status(200).json({ message: 'Parking modifiée !' }))
            .catch((error) => res.status(400).json({ error }));
      } else {
        Parking.updateOne({ _id: req.params.id }, { ...parkingObject, _id: req.params.id })
        .then(() =>res.status(200).json({ message: 'Parking modifiée !'}))
        .catch(error => res.status(400).json({ error }));
    }
  })
};

//Suppression d'une Parking
exports.deleteParking = (req, res, next) => {
    Parking.findOne({ _id: req.params.id })
    .then(parking => {
      Parking.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Parking supprimée !'}))
      .catch(error => res.status(400).json({ error }));
  })
    .catch(error => res.status(500).json({ error }));
};

//Affichage des Parkings
exports.getAllParkings = (req, res, next) => {
  Parking.find()
    .then(parkings => res.status(200).json(parkings))
    .catch(error => res.status(400).json({ error }));
};

//Affichage d'une Parking
exports.getOneParking = (req, res, next) => {
  Parking.findOne({ _id: req.params.id })
    .then(parking => res.status(200).json(parking))
    .catch(error => res.status(404).json({ error }));
};

