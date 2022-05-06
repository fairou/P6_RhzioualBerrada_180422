//Importation de jsonwebtoken
const jwt = require('jsonwebtoken');
// Prise en charge du fichier de configuration .env
require('dotenv').config();

//Exportation du module
module.exports = (req, res, next) => {
    try {
        //Token lié à l'id de l'utilisateur
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.Token);
        const userId = decodedToken.userId;
        req.auth = { userId };
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        } else {
            next();
        }
    } catch (error) {
        console.log('error', error);
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};