//Importation de mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Création d'un schéma de données
const parkingSchema = new Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    spaceNumber: { type: Number, min: 1, max: 24, required: true },
    floor: { type: Number, min: 0, max: 5, required: true },
    availability: { type: Boolean, default: true },
    occupancyTime: { type: Number, min: 1, max: 24, required: true }
});

//Exportation du modele
module.exports = mongoose.model('Parking', parkingSchema);
