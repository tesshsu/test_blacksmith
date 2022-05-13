
//Importation du modele 
const Parking = require('../models/parking');

//Importation file system
const fs = require('fs');

//Création d'une parking
exports.createParking = (req, res, next) => {
    const parkingObject = JSON.parse(req.body.parking);
    delete parkingObject._id;
    const parking = new Parking({
      ...parkingObject, 
    });
    parking.save()
      .then(() => res.status(201).json({ message: 'Parking reservation ajoutée !'}))
      .catch(error => res.status(400).json({ error }));
};

//Modification d'une Parking
exports.modifyParking = (req, res, next) => {
    const parkingObject = req.file ?
    {
      ...JSON.parse(req.body.parking),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    Parking.findOne({ _id: req.params.id })
      .then((parking) => {
        if(req.file == null) {
          Parking.updateOne({ _id: req.params.id },
            { ...parkingObject, _id: req.params.id})
            .then(() => res.status(200).json({ message: 'Parking modifiée !' }))
            .catch((error) => res.status(400).json({ error }));
      } else {
        const filename = parking.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Parking.updateOne({ _id: req.params.id }, { ...parkingObject, _id: req.params.id })
      .then(() =>res.status(200).json({ message: 'Parking modifiée !'}))
      .catch(error => res.status(400).json({ error }));
      });
    }
  })
};
   
//Suppression d'une parking
exports.deleteParking = (req, res, next) => {
  Parking.findOne({ _id: req.params.id })
    .then(parking => {
      const filename = parking.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Parking.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Parking supprimée !'}))
        .catch(error => res.status(400).json({ error }));
       });
  })
    .catch(error => res.status(500).json({ error }));
};

//Affichage des parkings
exports.getAllParkings = (req, res, next) => {
  Parking.find()
    .then(parkings => res.status(200).json(parkings))
    .catch(error => res.status(400).json({ error }));
};

//Affichage d'une parking
exports.getOneParking = (req, res, next) => {
  Parking.findOne({ _id: req.params.id })
    .then(parking => res.status(200).json(parking))
    .catch(error => res.status(404).json({ error }));
};
