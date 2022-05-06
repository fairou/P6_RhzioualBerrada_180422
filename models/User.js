//Importation de mongoose
const mongoose = require('mongoose');
//Importation de mongoose-unique-validator
const uniqueValidator = require('mongoose-unique-validator');

//Creation du model pour les utilisateurs
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);
//Exportation du model
module.exports = mongoose.model('users', userSchema);