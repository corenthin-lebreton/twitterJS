const tweetSchema = require('../schemas/tweetSchema');
const User = require('../schemas/UserSchema');

const createUserController = async (req, res) => 
{
    try {
        const username = req.body.username;
        const avatar = req.file.path;
        console.log(avatar)
        const userExist = await User.exists({username: username})

        if(userExist) {
            res.status(400).send("Nom d'utilisateur déjà utilisé");
            return;
        }
        if(avatar?.length === 0) {
        const newUser = new User();
        newUser.username = username;
        newUser.avatar = "data:image/png;base64,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"

        await newUser.save();

        res.status(200).send("Utilisateur créé avec succès");
        return;
        }else
            {
                const newUser = new User();
                newUser.username = username;
                newUser.avatar = avatar;

                await newUser.save();

                res.status(200).send("Utilisateur créé avec succès");
                return;
            }
       
    } catch (error) {
        console.log(error);
        return res.status(500).send("Erreur serveur");
    }
}

const patchUserController = async (req, res) => {
    try {
        const user = req.user;
        const newUsername = req.body.username;
        const newAvatar = req.body.avatar;
        user.username = newUsername;

        if(newAvatar?.length === 0){
            user.avatar = user.avatar;
        }
        else
            {
                user.avatar = newAvatar;
            }
        await user.save();

        res.status(200).send("Utilisateur modifié avec succès");

    } catch (error) {
        res.status(500).send("Erreur serveur");
    }

}

const deleteUserController = async (req, res) => {
    const user = req.user;
    const allTweets = await tweetSchema.find({user: user._id});
    
    await Promise.all(allTweets.map(document => { document.remove()}))
    await user.remove();
    res.status(200).send("Utilisateur supprimé avec succès");
}

module.exports = {createUserController, patchUserController, deleteUserController};