const User = require('../schemas/UserSchema');
const checkCreateUser = async (req, res, next) => 
{
    try {
        
        const username = req.body.username;

        const userExist = await User.exists({username: username})
    
            if(username === null || username === undefined) {
                res.status(400).send("Problème.");
                return;
            }
            if(userExist) {
                res.status(400).send("Nom d'utilisateur déjà utilisé");
                return;
            }

        if(username?.length <= 1) {
            res.status(400).send("Entrer un nom utilisateur valide.");
            return;
        }
    
        if(username?.length >= 30) {
            res.status(400).send("Entrer un nom utilisateur plus petit.");
        }

        if(typeof(username) !== "string") {
            res.status(400).send("Entrer un nom utilisateur valide.");
            return;
        }
        if(username === null) {
            res.status(400).send("Entrer un nom utilisateur valide.");
            return;
        }

        // check extension of avatar
            const avatar = req.file.path;
            extensionFile = avatar.split('.');
            switch(extensionFile[extensionFile.length - 1]) {
            
                case 'jpg':
                    break;
                case 'jpeg':
                    break;
                case 'png':
                    break;
                default:
                    res.status(400).send("Entrer une image valide.");
                    return;
            }

        next();
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Erreur serveur");
    }
}

const checkPatchValue = (req, res, next) =>
{
    try {
        const newUsername = req.body.username;
        console.log(newUsername);

        if(newUsername?.length <= 1) {
            res.status(400).send("Entrer un nom utilisateur valide.");
            return;
        }

        if(newUsername?.length >= 30) {
            res.status(400).send("Entrer un nom utilisateur plus petit.");
        }

        if(typeof(newUsername) !== "string") {
            res.status(400).send("Entrer un nom utilisateur valide.");
            return;
        }
        if(newUsername === null) {
            res.status(400).send("Entrer un nom utilisateur valide.");
            return;
        }

        next();
    } catch (error) {
        console.log(error);
        res.status(500).send("Erreur serveur");
    }
}

module.exports = {checkCreateUser, checkPatchValue};