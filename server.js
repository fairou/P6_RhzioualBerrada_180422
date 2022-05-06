const http = require('http');
const app = require('./app');
// Prise en charge du fichier dse configuration .env
require('dotenv').config();

//Utilisation d'un port spécifique depuis .env ou du port 3000 par défaut
const port = process.env.Port || 3000;
app.set('port', port);

//Crétion du serveur
const server = http.createServer(app);

server.listen(port, () => console.log(`server listening at port ${port}`));