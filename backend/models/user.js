//Importation de mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Importation du plugin
const uniqueValidator = require('mongoose-unique-validator');

//Definition roles
const ROLE = {
    ADMIN: 'admin',
    PUBLIC: 'public'
}

//Création d'un schéma
const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: ROLE.ADMIN },
    password: { type: String, required: true }
});

//Plugin appliqué au schéma pour empecher d'avoir plusieurs utilisateurs avec la meme adresse mail
userSchema.plugin(uniqueValidator);

//Exportation du shcéma sous forme de modèle
module.exports = mongoose.model('User', userSchema);
