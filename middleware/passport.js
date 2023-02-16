require('dotenv').config()
const passport = require('passport');   // On importe passport.js
const GoogleStrategy = require('passport-google-oauth20').Strategy; // On importe la stratégie du passport google OAuth 2.0
const { google } = require('googleapis');


// cette fonction prendra les infos du user pour le passer dans la session (cf. app.js)
passport.serializeUser(function(user, done) {
  done(null, user);
});
// puis passera dans cette fonction pour selectionner le user
passport.deserializeUser(function(user, done) {
  done(null, user);
});



// Créez une nouvelle instance de la stratégie Google OAuth2 qui demande à l'utilisateur de se connecter
passport.use(new GoogleStrategy({
  clientID: `${process.env.CLIENT_ID}`,
  clientSecret: `${process.env.CLIENT_SECRET}`,
  callbackURL: `${process.env.REDIRECT_URL}` // C'est le chemin défini dans le ggole cloud plateform. C'est le chemin de redirection après l'authentification.
},
// Ensuite, cette fonction sera déclenchée (puis, la fonction "serializeUser" (ci-dessus) sera appelée après)
async function (accessToken, refreshToken, profile, done) {
  console.log(profile);

  // Vérifiez si l'utilisateur est autorisé à accéder à la base de données
  const userId = profile.id; // L'ID utilisateur unique fourni par Google


  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json", // le nom du fichier comprenant notre clé sheet
    scopes: "https://www.googleapis.com/auth/spreadsheets" // URL de l'API google sheets
  })

  // creation d'un client pour auth
  const client = await auth.getClient();

  // Créons un objet google sheet. On l'utilisera pour accéder à nos informations
  const sheets = google.sheets({version: "v4", auth: client})
  const spreadsheetId = `${process.env.SHEET_USERS_ID}`;
  const range = 'users!A2:B';

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  const rows = response.data.values;

  // Liste des utilisateurs autorisés
  // ! Attention, rajouter l'id d'Alexandre dans la DB.
  const authorizedUsers = rows.map(row => row[0]);

  if (authorizedUsers.includes(userId)) {

    return done(null, profile);
  } else {
    // Si l'utilisateur n'est pas autorisé, renvoyez une erreur
    return done(new Error('User not authorized'));
  }
}

));
