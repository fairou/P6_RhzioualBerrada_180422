//Impoortation mongoose
const mongoose = require('mongoose');
//Impoortation Express
const express = require('express');
// Prise en charge du CORS 
const cors = require("corss");
//Protection des en-tetes headers
const helmet = require("helmet");

const path = require('path');

const rateLimit = require('express-rate-limit');

// Prise en charge du fichier de configuration .env
require("dotenv").config();

//Imporation des différentes routes
const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauces');



//Connexion à la bdd
mongoose.connect(process.env.DatabaseConnexion, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

//Utilisation d'express
const app = express();

app.use(express.static(path.join(__dirname, "images")));

//Protection des en-tetes headers
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy());
app.use(helmet.crossOriginResourcePolicy({ policy: "same-site" }));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

//CORS
app.use(cors({
    origin: 'http://localhost:4200',
    setHeader: [(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    ), (
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    )]
}));


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: "Too many request from this IP. please try again in 15 min",
    skipSuccessfulRequests: true, // count successful requests (status < 400)

})

// pour analyser le corps de la requête. prise en charge de json envoyé par le front dans le body
app.use(express.json());
//Middleware pour l'authentification
// Apply the rate limiting middleware to all authentification requests
app.use('/api/auth', limiter, userRoutes);

app.use('/api/sauces', saucesRoutes);

//Middleware pour le dossier images
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;