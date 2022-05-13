//Importation de mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Importation du plugin
const uniqueValidator = require('mongoose-unique-validator');

//Création d'un schéma
const userSchema = new Schema({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    role: {
        type: String,
        default: 'public',
        enum: ["public", "admin"]
    },
});

//Plugin appliqué au schéma pour empecher d'avoir plusieurs utilisateurs avec la meme adresse mail
userSchema.plugin(uniqueValidator);

//Exportation du shcéma sous forme de modèle
module.exports = mongoose.model('User', userSchema);