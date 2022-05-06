//Impoortation mongoose
const mongoose = require('mongoose');
//Impoortation Express
const express = require('express');
// Prise en charge du CORS 
const cors = require("corss");
//Protection des en-tetes headers
const helmet = require("helmet");

// Prise en charge du fichier de configuration .env
require("dotenv").config();

//Imporation des différentes routes
const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauces');

const path = require('path');

//Connexion à la bdd
mongoose.connect(process.env.DatabaseConnexion, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

//Utilisation d'express
const app = express();

//Protection des en-tetes headers
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy());
app.use(helmet.crossOriginResourcePolicy({ policy: "same-site" }));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

//CORS
app.use(cors({
    origin: 'http://localhost:4200'
}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

// prise en charge de json envoyé par le front dans le body
app.use(express.json());
//Middleware pour l'authentification
app.use('/api/auth', userRoutes);
//Middleware pour les sauces
app.use('/api/sauces', saucesRoutes);

//Middleware pour le dossier images
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;