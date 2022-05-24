const http = require('http');
const app = require('./app');

// Prise en charge du fichier dse configuration .env
require('dotenv').config();

const normalizePort = val => {
    const port = parseInt(val, 10);
    console.log(val);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

//Utilisation d'un port spécifique depuis .env ou du port 3000 par défaut
const port = normalizePort(process.env.Port || '3000');
app.set('port', port);

const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    let er = false;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            er = true;
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            er = true;
            break;
        default:
            throw error;
    }

    if (er) {
        process.exit(1);
    }
};


app.set('port', port);

//Crétion du serveur
const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

server.listen(port, () => console.log(`server listening at port ${port}`));