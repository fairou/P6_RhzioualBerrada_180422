# P6_RhzioualBerrada_180422

Création d'une API de sauce piquante

## Installation

pour démarrer l'API merci de suivre les étapes suivantes.

1. Lancer `npm install` depuis la console
   ```sh
   npm install
   ```
2. Créer/Configurer une base de donnée sur  'MongoDB Atlas'
3. Créer un dossier "images" à la racine du projet
4. Créer un fichier ".env" à la racine  du projet avec l'exemple de donner ci-dessous: 
    ```sh
    DatabaseConnexion = "mongodb+srv://user:password@cluster/DatabaseName?retryWrites=true&w=majority"
    Token = "xxxx_TOKEN_XXXXX"
    ExpireToken = '4h'
    Port = 3000
    Salt = 10
    ```

## Usage

Le serveur se lance via la commande `nodemon server`.
