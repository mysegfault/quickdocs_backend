require('dotenv').config()
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { User } = require("../../models/user_model");
const bcrypt = require('bcrypt');
// pour renforcer le hachage de password :
const saltRounds = 10;


// Fonction pour obtenir la liste de tous les users
exports.getUsers = (async (req, res) => {
    try {

        const allUsers = await User.find()

        res.json(allUsers)
        console.log(allUsers);


    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to get users from database' });
    }
})


// fonction pour afficher les données de l'utilisateur après les avoir authentifier avec le token.
exports.getUser = (async (req, res) => {
    try {
        console.log('req.user', req.user);
        // On souhaite trouver l'utilisateur correspondant à l'adresse mail fournie (usermail). Une fois vérifier, ca nous renvoie les informations de l'utilisateur (ID et adresse mail pour les utiliser après)
        const usermail = req.user.usermail;

        const user = await User.findOne({ usermail: usermail });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.json({
            id: user._id,
            usermail: user.usermail
        });

    } catch (err) {
        res.status(500).json({ error: 'Failed to get user from database' });
    }
})

// fonction pour créer un nouvel utilisateur (register). On hache le password avec qu'il soit entrer en BDD
exports.postUser = (async (req, res) => {
    try {
        console.log('req.body dans post ici : ', req.body);
        const { usermail, password } = req.body;

        // hashage du Mdp avant l'envoie dans la BDD : 
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        // on enregistre le mot de passe hashé dans la BDD
        const newUser = new User({
            usermail: usermail,
            password: hashedPassword
        });

            const savedUser = await newUser.save();
            res.json(savedUser);

    } catch (err) {
        console.error(err.message);
        res.status(400).json({ message: 'Echec de l\'enregistrement de l\'utilisateur dans la base de données', error });
    }
})

// Fonction pour se loguer. 1) on compare le mot de passe crypté puis si c'est bon: 2) on génère un token pour l'authentification pour afficher le reste
exports.postLogin = (async (req, res) => {
    try {
        console.log('req.body dans postLogin ici : ', req.body);
        const { usermail, password } = req.body;

        // pour trouver le user dans la BDD
        const user = await User.findOne({ usermail: usermail });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // bcrypt pour comparer le password/hashedpassword
        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if (validPassword) {
            // Création du token si l'utilisateur fait parti de la BDD
            const payload = { id: user._id, usermail: user.usermail };
            const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1000h" });

            return res.json({
                success: true,
                token: `Bearer ${token}`
            });
        } else {
            return res.status(400).json({ error: 'Password incorrect' });
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to find user in database' });
    }
})


// pour l'authentification avec le token
// Cette fonction nous sert à récupérer le token de la méthode post (une fois que le nouvel utilisateurs s'est enregistrer afin de vérifier s'il existe bien pour passer à la requete d'après qui est getUser, grâce à next()
function verifyToken(req, res, next) {
    try {
        const bearerHeader = req.headers['authorization'];
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];

        jwt.verify(bearerToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ error: 'Failed to authenticate token' });
            }

            req.user = decoded;
            next();
        });
    } catch (err) {
        console.error(err.message);
        return res.status(401).json({ error: 'No token provided' });
    }
};
exports.auth = verifyToken

exports.putUser = (async (req, res) => {
    try {
        // En front, on envoie toutes les infos (usermail, password) et il nous faut l'id.
        // même idée que pour postLogin car il faut hacher le MDP mais cette fois-ci on met à jour (update)
        const { id } = req.params
        const { usermail, password } = req.body;

        // on hach le nouveau password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // on met à jour les données grâce à l'id
        const updatedUser = await User.updateOne({ _id: id }, { usermail: usermail }, { password: hashedPassword });

        res.status(200).json({ message: "Mot de passe mis à jour avec succès" });

    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour du mot de passe", error });
    }
})

exports.deleteUser = (async (req, res) => {
    try {
        const { id } = req.params
        console.log(req.params);

        // on delete l'utilisateur
        const deletedUser = await User.deleteOne({ _id: id });

        res.status(200).json({ message: "Utilisateur supprimé avec succès" });

    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur", error });
    }
})

