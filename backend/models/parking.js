//Importation de mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Création d'un schéma de données
const parkingSchema = new Schema({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Parking',
    userId: { type: String, required: true },
    note: { type: String },
    imageUrl: { type: String },
    floor: { type: Number, min: 0, max: 5, required: true },
    spaceNumber: { type: Number, min: 1, max: 100, required: true },
    occupancyTime: { type: Number, min: 1, max: 24, required: true },
    availability: { type: Boolean, default: true }
});

//Exportation du modele 
module.exports = mongoose.model('Parking', parkingSchema);