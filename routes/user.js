//Impoortation Express
const express = require('express');
//Utilisation de la methode Router
const router = express.Router();

//Imporatation du controller des utilisateurs
const userCtrl = require('../controllers/user');

//Création des routes
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

//Exportation du router
module.exports = router;