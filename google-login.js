const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client('705829709643-vkhieqifai726sk7elkk7ucg8q3a7ebb.apps.googleusercontent.com');
const ticket = await client.verifyIdToken({
  idToken: inputs.accessToken,
  audience: '705829709643-vkhieqifai726sk7elkk7ucg8q3a7ebb.apps.googleusercontent.com'
});
const payload= ticket.getPayload();
console.log('Google payload is '+JSON.stringify(payload));
const userid = payload['sub'];
let email = payload['email'];
let emailVerified = payload['email_verified'];
let name = payload["name"];
let pictureUrl = payload["picture"];