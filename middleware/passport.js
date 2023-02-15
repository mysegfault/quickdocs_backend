require('dotenv').config()
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Créez une nouvelle instance de la stratégie Google OAuth2
passport.use(new GoogleStrategy({
  clientID: 'process.env.CLIENT_ID',
  clientSecret: 'process.env.CLIENT_SECRET',
  callbackURL: 'http://localhost:3000/auth/google/callback'
},

  // La fonction de rappel de la stratégie Google OAuth2
  function (accessToken, refreshToken, profile, done) {
    console.log(profile);
    // Vérifiez si l'utilisateur est autorisé à accéder à la base de données
    // const userId = profile.id; // L'ID utilisateur unique fourni par Google
   
    // const authorizedUsers = [1, 2]; // Liste des utilisateurs autorisés

    // if (authorizedUsers.includes(userId)) {
    //   // Enregistrez l'ID de l'utilisateur et ses informations de profil si besoin
    //   // ...
      return done(null, profile);
    // } else {
    //   // Si l'utilisateur n'est pas autorisé, renvoyez une erreur
    //   return done(new Error('User not authorized'));
    // }
  }
));

// Créez une route pour l'authentification Google OAuth2
app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

// Créez une route de rappel pour l'authentification Google OAuth2
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), function (req, res) {
  // Redirigez l'utilisateur vers la page souhaitée une fois connecté
  res.redirect('/dashboard');
});