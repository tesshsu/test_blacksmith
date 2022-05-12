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
    spaceNumber: { type: Number, min: 1, max: 24, required: true },
    floor: { type: Number, min: 0, max: 5, required: true },
    availability: { type: Boolean, default: true },
    occupancyTime: { type: Number, min: 1, max: 24, required: true },
    createdAt: { type: Date, immutable: true, default: () => Date.now() },
    updatedAt: { type: Date, immutable: true, default: () => Date.now() },
});

//Exportation du modele
module.exports = mongoose.model('Parking', parkingSchema);
