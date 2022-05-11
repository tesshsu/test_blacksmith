//Importation de password-validator
const passwordValidator = require("password-validator");

//Création d'un schéma
const passwordSchema = new passwordValidator();

//Propriétés
passwordSchema
    .is().min(4)
    .is().max(100)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().not().spaces();

//Exportation du schéma
module.exports = passwordSchema;
