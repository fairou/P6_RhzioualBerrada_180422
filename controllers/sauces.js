const Sauces = require('../models/sauces');
const fs = require('fs');

//Fonction ajout d'une Sauce
exports.createSauces = (req, res, next) => {

    const saucesObject = JSON.parse(req.body.sauce);
    delete saucesObject._id;
    const sauces = new Sauces({
        ...saucesObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauces.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

//Fonction récupérer une Sauce
exports.getOneSauces = (req, res, next) => {
    Sauces.findOne({
        _id: req.params.id
    }).then(
        (sauces) => {
            res.status(200).json(sauces);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

//Fonction modifier une Sauce
exports.modifySauces = (req, res, next) => {
    Sauces.findOne({ _id: req.params.id })
        .then((sauce) => {
            if (sauce.userId !== req.auth.userId) {
                return res.status(403).json({ error: "Accès non autorisé" });
            } else {
                if (req.file) {
                    const filename = sauce.imageUrl.split('/images/')[1];
                    fs.unlink(`images/${filename}`, (err) => {
                        if (err) {
                            console.log('error deleting file', err);
                        }
                    });
                }

                const saucesObject = req.file ? {
                    ...JSON.parse(req.body.sauce),
                    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                } : {...req.body };

                Sauces.updateOne({ _id: req.params.id }, {...saucesObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
                    .catch(error => res.status(400).json({ error }));

            }
        })
        .catch(error => res.status(500).json({ error }));

};

//Fonction supprimer une Sauce
exports.deleteSauces = (req, res, next) => {
    Sauces.findOne({ _id: req.params.id })
        .then(sauces => {
            if (sauces.userId !== req.auth.userId) {
                return res.status(403).json({ error: "Accès non autorisé" });
            } else {
                const filename = sauces.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, (err) => {
                    if (err) {
                        console.log('error deleting file', err);
                    }
                    Sauces.deleteOne({ _id: req.params.id })
                        .then(() => res.status(204).json({ message: 'Objet supprimé !' }))
                        .catch(error => res.status(400).json({ error }));
                });
            }
        })
        .catch(error => res.status(500).json({ error }));
};

//Fonction récupérer toutes les Sauces
exports.getAllSauces = (req, res, next) => {
    Sauces.find().then(
        (sauces) => {
            res.status(200).json(sauces);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

//Fonction Like ou Dislike  d'une Sauce
exports.likeDislikeSauces = (req, res, next) => {

    //Récupération de l'id de la sauce
    Sauces.findOne({ _id: req.params.id })
        .then((sauce) => {
            switch (req.body.like) {
                case 1:
                    //Si l'id user n'est pas présent dans le tableau des like alors on incrémente +1
                    if (!sauce.usersLiked.find((user) => user === req.body.userId)) {
                        Sauces.updateOne({ _id: req.params.id }, {
                                $inc: { likes: 1 },
                                $push: { usersLiked: req.body.userId },
                            })
                            .then(() => res.status(200).json({ message: "Like ajouté !" }))
                            .catch((error) => res.status(500).json(error));
                    } else {
                        //Si l'utilisateur a déjà liker le contenu alors il ne peut pas reliker
                        res.status(401).json({
                            error: "Like déjà pris en compte",
                        });
                    }
                    break;
                case -1:
                    //Si l'id user n'est pas présent dans le tableau des dislike alors on incrémente -1
                    if (!sauce.usersDisliked.find((user) => user === req.body.userId)) {
                        Sauces.updateOne({ _id: req.params.id }, {
                                $inc: { dislikes: 1 },
                                $push: { usersDisliked: req.body.userId },
                            })
                            .then(() => res.status(200).json({ message: "disLike retiré !" }))
                            .catch((error) => res.status(500).json(error));
                    } else {
                        //Si l'utilisateur a déjà disliker le contenu alors il ne peut pas redisliker
                        res.status(401).json({
                            error: "disLike déjà pris en compte",
                        });
                    }
                    break;

                case 0:
                    //Si l'id user n'est pas présent dans le tableau des like alors on incrémente -1
                    if (sauce.usersLiked.find(user => user === req.body.userId)) {
                        Sauces.updateOne({ _id: req.params.id }, {
                                $inc: { likes: -1 },
                                $pull: { usersLiked: req.body.userId },
                            })
                            .then(() => res.status(200).json({ message: "Like retiré !" }))
                            .catch((error) => res.status(500).json(error));
                    }
                    //Si l'id user n'est pas présent dans le tableau des dislike alors on incrémente -1

                    if (sauce.usersDisliked.find(user => user === req.body.userId)) {
                        Sauces.updateOne({ _id: req.params.id }, {
                                $inc: { dislikes: -1 },
                                $pull: { usersDisliked: req.body.userId },
                            })
                            .then(() => res.status(200).json({ message: "disLike retiré !" }))
                            .catch((error) => res.status(500).json(error));
                    }
                    break;

            }


        })
        .catch((error) => res.status(404).json(error));
};