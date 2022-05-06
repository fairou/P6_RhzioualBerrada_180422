const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require("dotenv").config();

//Fonction signup
exports.signup = (req, res, next) => {

    //Utilisation de bcrypt pour le hash du password
    bcrypt.hash(req.body.password, Number(process.env.Salt))
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash

            });

            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error })
        });
};

//Fonction login
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign({ userId: user._id },
                            process.env.Token, { expiresIn: process.env.ExpireToken }
                        )
                    });
                })
                .catch(error => {
                    console.log(error);
                    res.status(500).json({ error })
                });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error })
        });
};