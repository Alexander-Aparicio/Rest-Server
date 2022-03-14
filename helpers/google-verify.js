const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client( process.env.GOOGLE_CLIENT_ID );

async function googleVerify(token='') {
    
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
  });

  const payload = ticket.getPayload();

  console.log(payload)

  const { name:nombre, picture:img, email:correo } = ticket.getPayload()

  return{
    nombre,img,correo
  }

}

module.exports={
    googleVerify
}