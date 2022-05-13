
//Importation du modele 
const Parking = require('../models/parking');

//Importation file system
const fs = require('fs');

//Création d'une parking
exports.createParking = (req, res, next) => {
  try {
    const parkingObject = req.body;
    delete parkingObject._id;
    const parking = new Parking({
      ...parkingObject,
    });
    parking
      .save()
      .then(() => res.status(201).json({ message: "parking enregistrée" }))
      .catch((error) => res.status(400).json({ error }));
  } catch (err) {
    console.log('Error: ', err.message);
  }
};

//Modification d'une Parking
exports.updateParking = (req, res, next) => {
  const parkingObject = req.body;
  Parking.updateOne(
    { _id : req.params.id}, 
    {...parkingObject, _id: req.params.id}
    )
  .then(res.status(200).json({ message : "Parking modifiée"}))
  .catch(error => res.status(400).json({ error }));
};

//Suppression d'une parking
exports.deleteParking = (req, res, next) => {
  Parking.findOne({ _id: req.params.id })
    .then(parking => {
      Parking.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Parking supprimée !'}))
        .catch(error => res.status(400).json({ error }));
  })
    .catch(error => res.status(500).json({ error }));
};

//Affichage des parkings
exports.getAllParkings = (req, res, next) => {
  Parking.find().sort({ field: 'asc', test: -1 })
    .then(parkings => res.status(200).json(parkings))
    .catch(error => res.status(400).json({ error }));
};

//Affichage d'une parking
exports.getOneParking = (req, res, next) => {
  Parking.findOne({ _id: req.params.id })
    .then(parking => res.status(200).json(parking))
    .catch(error => res.status(404).json({ error }));
};
