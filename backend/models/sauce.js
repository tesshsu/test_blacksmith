//Importation de mongoose
const mongoose = require('mongoose');

//Création d'un schéma de données
const parkingSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    spaceNumber: { type: Number, required: true },
    floor: { type: Number, required: true },
    availability: { type: Boolean, required: true },
    occupancyTime: { type: Number, required: true }
});

//Exportation du modele
module.exports = mongoose.model('Parking', parkingSchema);
