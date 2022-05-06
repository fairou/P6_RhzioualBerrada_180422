const http = require('http');
const app = require('./app');
// Prise en charge du fichier de configuration .env
require('dotenv').config();

//Utilisation d'un port spécifique depuis .env ou du port 3000 par défaut
const port = process.env.Port || 3000;
app.set('port', port);

//Gestion des erreurs
const errorHandler = (error) => {
    if (error.syscall !== "listen") {
        throw error;
    }
    const address = server.address();
    const bind =
        typeof address === "string" ? "pipe " + address : "port: " + port;
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges.");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use.");
            process.exit(1);
            break;
        default:
            throw error;
    }
};

//Crétion du serveur
const server = http.createServer(app);

server.on("error", errorHandler);
server.on("listening", () => {
    const address = server.address();
    const bind = typeof address === "string" ? "pipe " + address : "port " + port;
    console.log("Listening on " + bind);
});
server.listen(port);