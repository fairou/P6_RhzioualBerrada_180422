//Impoortation Express
const express = require('express');
//Utilisation de la methode Router
const router = express.Router();

//Importation de auth pour la sécurité des routes
const auth = require('../middleware/auth');
//Imporation de multer pour les images
const multer = require('../middleware/multer-config');

//Imporatation du controller des sauces
const saucesCtrl = require('../controllers/sauces');

//Création des routes
router.get('/', auth, saucesCtrl.getAllSauces);
router.post('/', auth, multer, saucesCtrl.createSauces);
router.get('/:id', auth, saucesCtrl.getOneSauces);
router.put('/:id', auth, multer, saucesCtrl.modifySauces);
router.delete('/:id', auth, saucesCtrl.deleteSauces);
router.post("/:id/like", auth, saucesCtrl.likeDislikeSauces);

//Exportation du router
module.exports = router;