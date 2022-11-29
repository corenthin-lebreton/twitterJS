/*

Le projet consiste à :

Développer une application Twitter interne à IPSSI

Fonctionnalité impérative : 

s'identifier avec un nom utilisateur
publier un post texte
publier un sondage
afficher la météo en haut de la page


Avoir une API bien structurée avec les méthodes HTTP adéquate

Une application web React bien structurée


Pour les images convertir l'image vers base64 en js 
avec un drag'n drop par exemple


*/

require("../src/Database/database")
const express = require('express');
require('dotenv').config({path: "C:/Users/coren/Desktop/ApiProject/src/Database/.env"});
const dto = require('./dto/users.dto');
const controllers = require('../src/controllers/users.controllers');
const controllersTweet = require('../src/controllers/tweet.controllers');
const middleware = require('../src/Middlewares/auth.middleware');
const dtoTweet = require('../src/dto/tweets.dto');
const uploads = require('../src/Middlewares/upload.middleware');
const app = express();

app.use(express.json());

app.use('uploads',express.static('./uploads'));

const PORT = process.env.PORT || 3010;

app.listen(PORT, () => {
    try {
        console.log(`Server is running on port ${PORT}`);
        
    } catch (error) {
        console.log(error);
    }

});

//Création d'un utilisateur

app.post('/register',dto.checkCreateUser,uploads.uploadImg,controllers.createUserController, );

//modification d'un utilisateur

app.patch('/updateUser/user/',middleware.isAuthentificated,dto.checkPatchValue,controllers.patchUserController);

//suppression d'un utilisateur

app.delete('/deleteUser/user/',middleware.isAuthentificated,controllers.deleteUserController);

//Création d'un tweet
app.post('/twitterIPSSI/',middleware.isAuthentificated,dtoTweet.checkCreateTweet,controllersTweet.createTweets);

//suppression d'un tweet
app.delete('/deleteTweet/:tweetId',
middleware.isAuthentificated,dtoTweet.checkDeleteTweet,controllersTweet.deleteTweet);

//modification d'un tweet
app.patch('/updateTweet/:tweetId',middleware.isAuthentificated,dtoTweet.checkUpdateTweet,controllersTweet.updateTweet);