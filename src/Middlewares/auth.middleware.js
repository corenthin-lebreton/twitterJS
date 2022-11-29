const User = require('../schemas/UserSchema');

const isAuthentificated = async (req, res, next) => {
    
    try {
        const username = req.headers.username;

        if(!username) {
            res.status(401).send("Vous n'êtes pas authentifié");
            return;
        }
        
        const user = await User.findOne({username : username})
        if(!user) {
            res.status(401).send("Nom utilisateur incorrect");
            return;
        }

        req.user = user;
        next();

    } catch (error) {
        console.log(error)
        res.status(500).send("Erreur auth");
    }
}

module.exports = {isAuthentificated};