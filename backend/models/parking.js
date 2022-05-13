//Importation de mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Création d'un schéma de données
const parkingSchema = new Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String },
    heat: { type: Number, required: true },
    likes: { type: Number },
    dislikes: { type: Number },
    usersLiked: { type: [String] },
    usersDisliked: { type: [String] }
});

//Exportation du modele 
module.exports = mongoose.model('Parking', parkingSchema);