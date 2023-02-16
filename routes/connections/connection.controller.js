// Page d'accueil pour envoyer vers la connexion 
// Faire un bouton pour rediriger vers /google
exports.getStarted = (async (req, res) => {
    try {
        res.json({ message: "Bienvenue! Connecte toi" })
    } catch (error) {
        console.error(err.message);
    }
});



// Si échec de la connexion, cette fonction renvoie le message d'échec
exports.getFailed = (async (req, res) => {
    try {
        res.send("Tu n'es pas autorisé à te connecter à cette application")
    } catch (error) {
        console.error(err.message);
    }
});




// Chemin pour se déconnecter
exports.getLogout = (async (req, res) => {
    try {
        req.logout(function (err) {
                if (err) {
                    return next(err);
                }
                req.session.destroy(function (err) {
                    if (err) {
                        return next(err);
                    }
                    res.redirect('/');
                });
            });
    } catch (error) {
        console.error(err.message);
    }
});